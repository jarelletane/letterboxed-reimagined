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

export function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.screen}
      >
        <View style={styles.backgroundGlow}>
          <View style={styles.orangeGlow} />
          <View style={styles.blueGlow} />
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
            <Text style={styles.eyebrow}>A softer film diary</Text>
            <Text style={styles.title}>Remember what a film felt like.</Text>
            <Text style={styles.subtitle}>
              Log watches, keep notes and build a watchlist around mood, memory and the people you
              trust.
            </Text>
          </View>

          <View style={styles.posterShelf}>
            <View style={[styles.poster, styles.posterLarge]}>
              <Text style={styles.posterYear}>Tonight</Text>
              <Text style={styles.posterTitle}>Quiet drama</Text>
            </View>
            <View style={[styles.poster, styles.posterSmall, styles.posterOrange]}>
              <Text style={styles.posterYear}>4.5</Text>
            </View>
            <View style={[styles.poster, styles.posterSmall, styles.posterBlue]}>
              <Text style={styles.posterYear}>List</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Sign in</Text>
              <Text style={styles.cardCopy}>Pick up your diary, lists and unfinished thoughts.</Text>
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

            <Pressable style={styles.primaryButton}>
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
  backgroundGlow: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden"
  },
  orangeGlow: {
    position: "absolute",
    top: -90,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.orange,
    opacity: 0.16
  },
  blueGlow: {
    position: "absolute",
    left: -120,
    bottom: 80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.blue,
    opacity: 0.1
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
  posterShelf: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    minHeight: 170
  },
  poster: {
    justifyContent: "flex-end",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.card
  },
  posterLarge: {
    flex: 1,
    height: 170,
    backgroundColor: "#20282f"
  },
  posterSmall: {
    width: 78,
    height: 128
  },
  posterOrange: {
    backgroundColor: "rgba(255, 138, 43, 0.22)"
  },
  posterBlue: {
    backgroundColor: "rgba(24, 185, 242, 0.2)"
  },
  posterYear: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12,
    textTransform: "uppercase"
  },
  posterTitle: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 25,
    lineHeight: 29
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
