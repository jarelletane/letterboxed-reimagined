import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { colors, fonts, radii, spacing } from "../theme";

const letterboxedLogo = require("../../assets/letterboxed-logo.png");

const moodDots = [
  { label: "Warm", color: colors.orange },
  { label: "Social", color: colors.green },
  { label: "New", color: colors.blue }
];

type LoginScreenProps = {
  onContinue: () => void;
};

export function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.screen}
      >
        <View style={styles.backgroundTexture}>
          <View style={[styles.projectorBeam, styles.projectorBeamOrange]} />
          <View style={[styles.projectorBeam, styles.projectorBeamGreen]} />
          <View style={[styles.projectorBeam, styles.projectorBeamBlue]} />
          <View style={styles.filmStrip} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image source={letterboxedLogo} style={styles.logo} resizeMode="contain" />
            <View style={styles.betaPill}>
              <Text style={styles.betaText}>Reimagined</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Film tracking, redesigned</Text>
            <Text style={styles.title}>A cleaner way to log every film.</Text>
            <Text style={styles.subtitle}>
              Rate films, keep a diary, build watchlists and revisit your history in a calmer
              mobile experience.
            </Text>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Sign in</Text>
              <Text style={styles.cardCopy}>Continue to your diary, lists and watch history.</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter password"
                placeholderTextColor={colors.muted}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <Pressable style={styles.primaryButton} onPress={onContinue}>
              <Text style={styles.primaryButtonText}>Continue</Text>
            </Pressable>

            <View style={styles.moodRow}>
              {moodDots.map((dot) => (
                <View key={dot.label} style={styles.moodItem}>
                  <View style={[styles.moodDot, { backgroundColor: dot.color }]} />
                  <Text style={styles.moodLabel}>{dot.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.charcoal
  },
  screen: {
    flex: 1
  },
  backgroundTexture: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden"
  },
  projectorBeam: {
    position: "absolute",
    top: -60,
    width: 54,
    height: 420,
    borderRadius: 28,
    opacity: 0.12,
    transform: [{ rotate: "16deg" }]
  },
  projectorBeamOrange: {
    right: 20,
    backgroundColor: colors.orange
  },
  projectorBeamGreen: {
    right: 86,
    backgroundColor: colors.green,
    opacity: 0.1
  },
  projectorBeamBlue: {
    right: 152,
    backgroundColor: colors.blue,
    opacity: 0.08
  },
  filmStrip: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 122,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  },
  content: {
    flexGrow: 1,
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  logo: {
    width: 210,
    height: 48
  },
  betaPill: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: "rgba(255, 255, 255, 0.06)"
  },
  betaText: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11
  },
  hero: {
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  eyebrow: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    maxWidth: 340,
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 43,
    lineHeight: 46
  },
  subtitle: {
    maxWidth: 330,
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24
  },
  card: {
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: "rgba(23, 29, 34, 0.9)"
  },
  cardTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 25
  },
  cardCopy: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20
  },
  fieldGroup: {
    gap: spacing.xs
  },
  label: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    color: colors.ink,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    fontFamily: fonts.sansRegular,
    fontSize: 16
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  primaryButtonText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 16
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  moodItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  moodDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  moodLabel: {
    color: colors.muted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12
  }
});
