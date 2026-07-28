import { puceApi } from "@/core/api/puceApi";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";


interface CreateClientDataI {
  value?: string;
  malimax: boolean;
  user: string;
  userId: number | null;
  password: string;
  address: string;
  businessName: string;
  canton: string;
  cantonId: number | null;
  coordinates: string;
  country: string;
  countryId: number | null;
  docNumber: string | null;
  docType: string | null;
  docTypeId: number | null;
  fechaingre: string | Date;
  firstName: string;
  id?: number | null;
  lastName: string;
  logo: string | null;
  mail: string;
  name: string;
  parish: string;
  parishId: number | null;
  phone: string;
  province: string;
  provinceId: number | null;
  typeClient: string;
  typeClientId: number | null;
  exterior: boolean;
  clientInvoice: [];
  users: [];
}

const INITIAL_FORM: CreateClientDataI = {
  malimax: false,
  user: "",
  userId: null,
  password: "",
  address: "",
  businessName: "",
  canton: "",
  cantonId: null,
  coordinates: "",
  country: "",
  countryId: null,
  docNumber: null,
  docType: "RUC",
  docTypeId: 2,
  fechaingre: new Date().toISOString().split("T")[0],
  firstName: "",
  lastName: "",
  logo: null,
  mail: "",
  name: "",
  parish: "",
  parishId: null,
  phone: "",
  province: "",
  provinceId: null,
  typeClient: "Jurídico",
  typeClientId: 17,
  exterior: false,
  clientInvoice: [],
  users: [],
};


interface FieldErrors {
  name?: string;
  docNumber?: string;
  phone?: string;
  mail?: string;
  user?: string;
}

const validate = (form: CreateClientDataI): FieldErrors => {
  const errs: FieldErrors = {};
  if (!form.name.trim()) errs.name = "La razón social es requerida";
  if (!form.docNumber || form.docNumber.length < 13)
    errs.docNumber = "El RUC debe tener 13 dígitos";
  if (!form.phone.trim()) errs.phone = "El teléfono es requerido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail))
    errs.mail = "Email inválido";
  if (form.user.trim().length < 5)
    errs.user = "Usuario debe tener mínimo 5 caracteres";
  return errs;
};


const SectionHeader = ({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) => (
  <View style={sectionStyles.row}>
    <Ionicons name={icon as any} size={16} color={color} />
    <Text style={[sectionStyles.label, { color }]}>{label}</Text>
  </View>
);

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});

// ─── Main Component ───────────────────────────────────────────────────────────

const CreateClientScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const bg = isDark ? "#111827" : "#F9FAFB";
  const cardBg = isDark ? "#1F2937" : "#FFFFFF";
  const inputBg = isDark ? "#374151" : "#F3F4F6";
  const borderCol = isDark ? "#4B5563" : "#E5E7EB";
  const mutedText = isDark ? "#9CA3AF" : "#6B7280";
  const errorCol = "#EF4444";

  const [form, setForm] = useState<CreateClientDataI>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [syncBiz, setSyncBiz] = useState(true); // businessName mirrors name when true

  // Refs for keyboard focus flow
  const docRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const mailRef = useRef<TextInput>(null);
  const userRef = useRef<TextInput>(null);
  const addrRef = useRef<TextInput>(null);

  const patch = useCallback(
    (fields: Partial<CreateClientDataI>) =>
      setForm((prev) => ({ ...prev, ...fields })),
    [],
  );

  // ── Name field: mirrors to businessName while syncBiz is on
  const handleNameChange = (val: string) => {
    const upper = val.toUpperCase();
    patch({
      name: upper,
      ...(syncBiz ? { businessName: upper } : {}),
    });
  };

  // ── Logo picker
  const handlePickLogo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Necesitamos acceso a tu galería para subir el logo.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      patch({ logo: `data:image/jpeg;base64,${asset.base64}` });
    }
  };

  // ── Submit
  const handleSubmit = async () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    form.clientInvoice = [];
    form.users = [];
    try {
      await puceApi.post("/clients", form);
      Alert.alert(
        "✅ Cliente creado",
        "El cliente fue registrado exitosamente.",
      );
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Ocurrió un error inesperado";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Field renderer helper
  const renderInput = (opts: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    error?: string;
    keyboardType?: TextInput["props"]["keyboardType"];
    autoCapitalize?: TextInput["props"]["autoCapitalize"];
    ref?: React.RefObject<TextInput>;
    nextRef?: React.RefObject<TextInput>;
    addonLeft?: string;
    multiline?: boolean;
    optional?: boolean;
  }) => (
    <View style={{ marginBottom: 14 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={[styles.fieldLabel, { color: mutedText }]}>
          {opts.label}
        </Text>
        {opts.optional && (
          <Text
            style={[
              styles.optionalBadge,
              { color: mutedText, borderColor: borderCol },
            ]}
          >
            Opcional
          </Text>
        )}
      </View>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: inputBg,
            borderColor: opts.error ? errorCol : borderCol,
          },
          opts.multiline && { minHeight: 72, alignItems: "flex-start" },
        ]}
      >
        {opts.addonLeft && (
          <View
            style={[
              styles.addon,
              { backgroundColor: isDark ? "#4B5563" : "#E5E7EB" },
            ]}
          >
            <Text style={{ color: textColor, fontSize: 13, fontWeight: "600" }}>
              {opts.addonLeft}
            </Text>
          </View>
        )}
        <TextInput
          ref={opts.ref}
          style={[
            styles.textInput,
            { color: textColor },
            opts.multiline && { paddingTop: 10 },
          ]}
          placeholder={opts.placeholder ?? opts.label}
          placeholderTextColor={mutedText}
          value={opts.value}
          onChangeText={opts.onChange}
          keyboardType={opts.keyboardType ?? "default"}
          autoCapitalize={opts.autoCapitalize ?? "none"}
          multiline={opts.multiline}
          returnKeyType={opts.nextRef ? "next" : "done"}
          onSubmitEditing={() => opts.nextRef?.current?.focus()}
          blurOnSubmit={!opts.nextRef}
        />
      </View>

      {opts.error && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={13} color={errorCol} />
          <Text style={[styles.errorText, { color: errorCol }]}>
            {opts.error}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: bg }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page title */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageSubtitle, { color: mutedText }]}>
            Tipo: Jurídico · RUC
          </Text>
        </View>

        {/* ══ LOGO ══════════════════════════════════════════════════════════ */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: borderCol },
          ]}
        >
          <SectionHeader
            icon="image-outline"
            label="Logo"
            color={primaryColor}
          />
          <View style={styles.logoRow}>
            <TouchableOpacity
              onPress={handlePickLogo}
              style={[
                styles.logoBox,
                { borderColor: primaryColor, backgroundColor: inputBg },
              ]}
              activeOpacity={0.8}
            >
              {form.logo ? (
                <Image source={{ uri: form.logo }} style={styles.logoImg} />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={28}
                    color={primaryColor}
                  />
                  <Text style={[styles.logoHint, { color: mutedText }]}>
                    Subir logo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {form.logo && (
              <TouchableOpacity
                onPress={() => patch({ logo: null })}
                style={[styles.removeLogo, { backgroundColor: "#FEE2E2" }]}
              >
                <Ionicons name="trash-outline" size={18} color={errorCol} />
                <Text style={[styles.removeLogoText, { color: errorCol }]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ══ IDENTIFICACIÓN ════════════════════════════════════════════════ */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: borderCol },
          ]}
        >
          <SectionHeader
            icon="document-text-outline"
            label="Identificación"
            color={primaryColor}
          />

          {renderInput({
            label: "Razón Social",
            value: form.name,
            onChange: handleNameChange,
            autoCapitalize: "characters",
            error: errors.name,
            ref: docRef as any,
            nextRef: phoneRef as any,
          })}

          <View style={{ marginBottom: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={[styles.fieldLabel, { color: mutedText }]}>
                Nombre Comercial
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const next = !syncBiz;
                  setSyncBiz(next);
                  if (next) patch({ businessName: form.name });
                }}
                style={[
                  styles.syncBadge,
                  {
                    backgroundColor: syncBiz ? `${primaryColor}22` : inputBg,
                    borderColor: syncBiz ? primaryColor : borderCol,
                  },
                ]}
              >
                <Ionicons
                  name={syncBiz ? "sync" : "sync-outline"}
                  size={11}
                  color={syncBiz ? primaryColor : mutedText}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: syncBiz ? primaryColor : mutedText,
                    marginLeft: 3,
                  }}
                >
                  {syncBiz ? "Sincronizado" : "Sincronizar"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: inputBg, borderColor: borderCol },
              ]}
            >
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                placeholder="Nombre Comercial"
                placeholderTextColor={mutedText}
                value={form.businessName}
                onChangeText={(v) => patch({ businessName: v.toUpperCase() })}
                autoCapitalize="characters"
              />
            </View>
          </View>

          {renderInput({
            label: "RUC",
            value: form.docNumber ?? "",
            onChange: (v) =>
              patch({ docNumber: v.replace(/\D/g, "").slice(0, 13) }),
            keyboardType: "number-pad",
            error: errors.docNumber,
            addonLeft: "RUC",
            placeholder: "0000000000001",
          })}
        </View>

        {/* ══ CONTACTO ══════════════════════════════════════════════════════ */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: borderCol },
          ]}
        >
          <SectionHeader
            icon="call-outline"
            label="Contacto"
            color={primaryColor}
          />

          {renderInput({
            label: "Teléfono",
            value: form.phone,
            onChange: (v) => patch({ phone: v.replace(/\D/g, "") }),
            keyboardType: "phone-pad",
            addonLeft: "+593",
            error: errors.phone,
            ref: phoneRef as any,
            nextRef: mailRef as any,
            placeholder: "988776655",
          })}

          {renderInput({
            label: "Email",
            value: form.mail,
            onChange: (v) => patch({ mail: v.trim().toLowerCase() }),
            keyboardType: "email-address",
            error: errors.mail,
            ref: mailRef as any,
            nextRef: userRef as any,
            placeholder: "empresa@mail.com",
          })}

          {renderInput({
            label: "Dirección",
            value: form.address,
            onChange: (v) => patch({ address: v }),
            optional: true,
            multiline: true,
            ref: addrRef as any,
            placeholder: "Calle principal y secundaria...",
            autoCapitalize: "sentences",
          })}
        </View>

        {/* ══ ACCESO ════════════════════════════════════════════════════════ */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: borderCol },
          ]}
        >
          <SectionHeader
            icon="key-outline"
            label="Acceso"
            color={primaryColor}
          />

          {renderInput({
            label: "Usuario",
            value: form.user,
            onChange: (v) => patch({ user: v.trim().toLowerCase() }),
            error: errors.user,
            ref: userRef as any,
            placeholder: "mínimo 5 caracteres",
          })}

          <View
            style={[
              styles.alertBox,
              {
                backgroundColor: isDark ? "#422006" : "#FFF7ED",
                borderColor: "#F97316",
              },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#F97316"
            />
            <Text
              style={[
                styles.alertText,
                { color: isDark ? "#FED7AA" : "#9A3412" },
              ]}
            >
              Se enviará la clave de acceso al email ingresado
            </Text>
          </View>
        </View>

        {/* ══ OPCIONES ══════════════════════════════════════════════════════ */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: borderCol },
          ]}
        >
          <SectionHeader
            icon="options-outline"
            label="Opciones"
            color={primaryColor}
          />

          <TouchableOpacity
            onPress={() => patch({ malimax: !form.malimax })}
            activeOpacity={0.8}
            style={[
              styles.checkRow,
              {
                backgroundColor: form.malimax ? `${primaryColor}18` : inputBg,
                borderColor: form.malimax ? primaryColor : borderCol,
              },
            ]}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: form.malimax ? primaryColor : "transparent",
                  borderColor: form.malimax ? primaryColor : mutedText,
                },
              ]}
            >
              {form.malimax && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.checkLabel, { color: textColor }]}>
                Cliente Malimax
              </Text>
              <Text style={[styles.checkSub, { color: mutedText }]}>
                Activa beneficios exclusivos para este cliente
              </Text>
            </View>
            <View
              style={[
                styles.malimaxBadge,
                {
                  backgroundColor: form.malimax ? primaryColor : "transparent",
                  borderColor: form.malimax ? primaryColor : borderCol,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: form.malimax ? "#fff" : mutedText,
                  fontWeight: "700",
                }}
              >
                {form.malimax ? "ACTIVO" : "INACTIVO"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ══ SUBMIT ════════════════════════════════════════════════════════ */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.85}
          style={[
            styles.submitBtn,
            { backgroundColor: primaryColor, opacity: loading ? 0.7 : 1 },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="person-add" size={20} color="#fff" />
              <Text style={styles.submitText}>Crear Cliente</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  pageHeader: { marginBottom: 16, paddingHorizontal: 2 },
  pageTitle: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  pageSubtitle: { fontSize: 13, marginTop: 2 },

  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  fieldLabel: { fontSize: 12, fontWeight: "600" },
  optionalBadge: {
    fontSize: 10,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },

  inputWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    minHeight: 44,
  },
  addon: {
    paddingHorizontal: 12,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  errorText: { fontSize: 11 },

  syncBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  logoRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: { width: "100%", height: "100%", resizeMode: "cover" },
  logoPlaceholder: { alignItems: "center", gap: 4 },
  logoHint: { fontSize: 11 },
  removeLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 8,
    padding: 8,
  },
  removeLogoText: { fontSize: 12, fontWeight: "600" },

  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
  },
  alertText: { fontSize: 12, flex: 1 },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkLabel: { fontSize: 14, fontWeight: "700" },
  checkSub: { fontSize: 11, marginTop: 1 },
  malimaxBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  submitBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});

export default CreateClientScreen;
