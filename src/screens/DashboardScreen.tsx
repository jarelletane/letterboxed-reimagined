import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
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

const cinemaPicks = [
  { title: "Past Lives", meta: "Palace James St · 6:40 PM", match: "94%", color: colors.green },
  { title: "The Zone of Interest", meta: "Dendy Coorparoo · 8:10 PM", match: "89%", color: colors.blue },
  { title: "Anatomy of a Fall", meta: "New Farm Cinemas · 7:30 PM", match: "87%", color: colors.orange }
];

const streamingPicks = [
  { title: "Aftersun", service: "Mubi", reason: "quiet, emotional, highly rated by friends" },
  { title: "The Farewell", service: "Prime", reason: "family drama from your watchlist" },
  { title: "Decision to Leave", service: "Netflix", reason: "stylish mystery with a strong match" }
];

const popularForYou = [
  { title: "Challengers", stat: "Popular with friends", accent: colors.orange },
  { title: "Perfect Days", stat: "Trending in slow cinema", accent: colors.green },
  { title: "Dune: Part Two", stat: "Biggest this week", accent: colors.blue }
];

const followingActivity = [
  {
    friend: "Hannah",
    action: "rated",
    film: "The Worst Person in the World",
    detail: "5 stars · said it felt painfully real",
    color: colors.green,
    poster: colors.blue
  },
  {
    friend: "Mia",
    action: "logged",
    film: "Challengers",
    detail: "rewatch · added to Tennis chaos list",
    color: colors.orange,
    poster: colors.orange
  },
  {
    friend: "Sam",
    action: "reviewed",
    film: "Perfect Days",
    detail: "quiet, patient and probably my favourite this month",
    color: colors.blue,
    poster: colors.green
  }
];

const friendLists = [
  "Films for a rainy Sunday",
  "Movies that made us text the group chat",
  "Beautiful endings"
];

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Search", icon: "search" },
  { label: "Log", icon: "add-circle" },
  { label: "Lists", icon: "albums" },
  { label: "Profile", icon: "person" }
] as const;

const feedTabWidth = 108;
const feedTabGap = spacing.xs;

type LogMovie = {
  title: string;
  meta: string;
};

const featuredMovie: LogMovie = {
  title: "Sentimental Value",
  meta: "2025 · Joachim Trier · Norway"
};

export function DashboardScreen({ onLogout }: { onLogout: () => void }) {
  const [activeFeed, setActiveFeed] = useState<"forYou" | "following">("forYou");
  const [screen, setScreen] = useState<"home" | "log">("home");
  const [logMovie, setLogMovie] = useState<LogMovie | undefined>();
  const feedIndicatorX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(feedIndicatorX, {
      toValue: activeFeed === "forYou" ? 0 : feedTabWidth + feedTabGap,
      useNativeDriver: true,
      friction: 9,
      tension: 115
    }).start();
  }, [activeFeed, feedIndicatorX]);

  if (screen === "log") {
    return <LogMovieScreen movie={logMovie} onBack={() => setScreen("home")} />;
  }

  const openLogScreen = (movie?: LogMovie) => {
    setLogMovie(movie);
    setScreen("log");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={letterboxedLogo} style={styles.logo} resizeMode="contain" />
          <Pressable style={styles.profileButton} onPress={onLogout}>
            <Text style={styles.profileInitial}>M</Text>
          </Pressable>
        </View>

        <View style={styles.feedTabs}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.feedTabIndicator,
              {
                transform: [{ translateX: feedIndicatorX }]
              }
            ]}
          />
          <Pressable
            style={activeFeed === "forYou" ? styles.feedTabActive : styles.feedTab}
            onPress={() => setActiveFeed("forYou")}
          >
            <Text style={activeFeed === "forYou" ? styles.feedTabTextActive : styles.feedTabText}>
              For You
            </Text>
          </Pressable>
          <Pressable
            style={activeFeed === "following" ? styles.feedTabActive : styles.feedTab}
            onPress={() => setActiveFeed("following")}
          >
            <Text style={activeFeed === "following" ? styles.feedTabTextActive : styles.feedTabText}>
              Following
            </Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{activeFeed === "forYou" ? "For you" : "Following"}</Text>
          <Text style={styles.title}>
            {activeFeed === "forYou" ? "Your next watch" : "What friends watched"}
          </Text>
          <Text style={styles.subtitle}>
            {activeFeed === "forYou"
              ? "Personal picks across cinemas, streaming and your watchlist, based on what you rate highly and save."
              : "Recent ratings, reviews and lists from people whose taste you trust."}
          </Text>
        </View>

        {activeFeed === "forYou" && (
          <>
            <Pressable style={styles.quickLogCard} onPress={() => openLogScreen()}>
              <View style={styles.quickLogIcon}>
                <Text style={styles.quickLogIconText}>+</Text>
              </View>
              <View style={styles.quickLogText}>
                <Text style={styles.quickLogTitle}>Log a movie</Text>
                <Text style={styles.quickLogCopy}>Search, rate and save notes in under a minute.</Text>
              </View>
              <Text style={styles.quickLogArrow}>→</Text>
            </Pressable>

            <View style={styles.quickActionRow}>
              {["Search title", "Scan ticket", "Rate recent"].map((action) => (
                <Pressable key={action} style={styles.quickAction}>
                  <Text style={styles.quickActionText}>{action}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {activeFeed === "forYou" ? <ForYouFeed onLog={openLogScreen} /> : <FollowingFeed />}
      </ScrollView>
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => {
              if (item.label === "Log") openLogScreen();
            }}
            style={
              item.label === "Log"
                ? styles.bottomNavLogItem
                : item.label === "Home"
                  ? styles.bottomNavItemActive
                  : styles.bottomNavItem
            }
          >
            <Ionicons
              name={item.icon}
              size={item.label === "Log" ? 24 : 19}
              color={item.label === "Log" ? colors.charcoal : item.label === "Home" ? colors.ink : colors.muted}
            />
            <Text
              style={
                item.label === "Log"
                  ? styles.bottomNavLogText
                  : item.label === "Home"
                    ? styles.bottomNavTextActive
                    : styles.bottomNavText
              }
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ForYouFeed({ onLog }: { onLog: (movie?: LogMovie) => void }) {
  const [notInterested, setNotInterested] = useState(false);

  return (
    <>
        <View style={[styles.featureCard, notInterested && styles.featureCardMuted]}>
          <View style={styles.featureLightBars}>
            <View style={[styles.featureLightBar, { backgroundColor: colors.orange }]} />
            <View style={[styles.featureLightBar, { backgroundColor: colors.green }]} />
            <View style={[styles.featureLightBar, { backgroundColor: colors.blue }]} />
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.featureLabel}>Top match today</Text>
            {!notInterested && <Text style={styles.matchPill}>97% match</Text>}
          </View>
          {notInterested ? (
            <>
              <Text style={styles.featureTitle}>Noted</Text>
              <Text style={styles.featureCopy}>
                We’ll suggest something better next time. Your top match refreshes each day.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.featureTitle}>{featuredMovie.title}</Text>
              <Text style={styles.featureCopy}>{featuredMovie.meta}</Text>
              <View style={styles.featureActions}>
                <Pressable style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Add to Watchlist</Text>
                </Pressable>
                <Pressable style={styles.secondaryButton} onPress={() => onLog(featuredMovie)}>
                  <Text style={styles.secondaryButtonText}>I've Seen It</Text>
                </Pressable>
                <Pressable style={styles.secondaryButton} onPress={() => setNotInterested(true)}>
                  <Text style={styles.secondaryButtonText}>Not Interested</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>

        <View style={styles.goalCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionTitle}>2026 watch goal</Text>
              <Text style={styles.goalCopy}>43 of 80 films logged</Text>
            </View>
            <Text style={styles.goalPercent}>54%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.goalStats}>
            <View style={styles.goalStat}>
              <Text style={styles.goalStatValue}>12</Text>
              <Text style={styles.goalStatLabel}>new directors</Text>
            </View>
            <View style={styles.goalStat}>
              <Text style={styles.goalStatValue}>8</Text>
              <Text style={styles.goalStatLabel}>cinema trips</Text>
            </View>
            <View style={styles.goalStat}>
              <Text style={styles.goalStatValue}>21</Text>
              <Text style={styles.goalStatLabel}>watchlist clears</Text>
            </View>
          </View>
        </View>

        <SectionHeader title="In cinemas near you" action="Set location" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hStack}>
          {cinemaPicks.map((movie) => (
            <MovieCard key={movie.title} {...movie} />
          ))}
        </ScrollView>

        <SectionHeader title="Your next at-home watch" action="Services" />
        <View style={styles.streamingList}>
          {streamingPicks.map((movie) => (
            <View key={movie.title} style={styles.streamingRow}>
              <View style={styles.miniPoster} />
              <View style={styles.streamingText}>
                <Text style={styles.streamingTitle}>{movie.title}</Text>
                <Text style={styles.streamingMeta}>{movie.service} · {movie.reason}</Text>
              </View>
              <Text style={styles.plusButton}>+</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Popular with your taste" action="Refresh" />
        <View style={styles.popularGrid}>
          {popularForYou.map((movie) => (
            <View key={movie.title} style={styles.popularCard}>
              <View style={[styles.popularAccent, { backgroundColor: movie.accent }]} />
              <Text style={styles.popularTitle}>{movie.title}</Text>
              <Text style={styles.popularStat}>{movie.stat}</Text>
            </View>
          ))}
        </View>
    </>
  );
}

function FollowingFeed() {
  return (
    <>
      <SectionHeader title="Friend activity" action="Manage" />
      <View style={styles.followingList}>
        {followingActivity.map((item) => (
          <View key={`${item.friend}-${item.film}`} style={styles.activityCard}>
            <View style={styles.activityPosterWrap}>
              <View style={[styles.activityPoster, { backgroundColor: item.poster }]} />
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.friend.slice(0, 1)}</Text>
              </View>
            </View>
            <View style={styles.activityBody}>
              <Text style={styles.activityMeta}>
                {item.friend} {item.action}
              </Text>
              <Text style={styles.activityTitle}>{item.film}</Text>
              <Text style={styles.activityDetail}>{item.detail}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </View>
        ))}
      </View>

      <View style={styles.friendHighlight}>
        <View>
          <Text style={styles.featureLabel}>Most talked about</Text>
          <Text style={styles.featureTitle}>Challengers</Text>
          <Text style={styles.featureCopy}>8 friends logged it this week · average 4.1 stars</Text>
        </View>
        <View style={styles.friendPosterStack}>
          <View style={[styles.friendPoster, { backgroundColor: colors.orange }]} />
          <View style={[styles.friendPoster, styles.friendPosterMiddle, { backgroundColor: colors.green }]} />
          <View style={[styles.friendPoster, styles.friendPosterTop, { backgroundColor: colors.blue }]} />
        </View>
      </View>

      <SectionHeader title="Lists from friends" action="See all" />
      <View style={styles.friendListCards}>
        {friendLists.map((list, index) => (
          <View key={list} style={styles.friendListCard}>
            <Text style={styles.friendListCount}>{index + 8} films</Text>
            <Text style={styles.friendListTitle}>{list}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function LogMovieScreen({ movie, onBack }: { movie?: LogMovie; onBack: () => void }) {
  const [movieTitle, setMovieTitle] = useState(movie?.title ?? "");
  const [watchLocation, setWatchLocation] = useState<"cinema" | "home">("cinema");
  const [rating, setRating] = useState(4);
  const [liked, setLiked] = useState(false);
  const [dateUnknown, setDateUnknown] = useState(false);
  const today = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date());

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.logContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logHeader}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={20} color={colors.ink} />
          </Pressable>
          <Text style={styles.logHeaderTitle}>Log a movie</Text>
          <View style={styles.backButtonGhost} />
        </View>

        <View style={styles.logHero}>
          <Text style={styles.eyebrow}>Fast log</Text>
          <Text style={styles.logTitle}>What did you watch?</Text>
          <Text style={styles.subtitle}>
            Search the film, add where you watched it, rate it and save. Everything else can wait.
          </Text>
        </View>

        <View style={styles.logCard}>
          <View style={styles.logField}>
            <Text style={styles.label}>Movie</Text>
            <View style={styles.searchInputShell}>
              <Ionicons name="search" size={18} color={colors.muted} />
              <TextInput
                value={movieTitle}
                onChangeText={setMovieTitle}
                placeholder="Search for a movie"
                placeholderTextColor={colors.muted}
                style={styles.searchInput}
              />
            </View>
            <View style={movieTitle ? styles.searchSuggestionSelected : styles.searchSuggestion}>
              <View style={styles.suggestionPoster} />
              <View style={styles.streamingText}>
                <Text style={styles.streamingTitle}>{movieTitle || featuredMovie.title}</Text>
                <Text style={styles.streamingMeta}>{movie?.meta ?? featuredMovie.meta}</Text>
              </View>
              <Ionicons name={movieTitle ? "checkmark-circle" : "add-circle"} size={24} color={colors.green} />
            </View>
          </View>

          <View style={styles.logField}>
            <Text style={styles.label}>Where did you watch it?</Text>
            <View style={styles.logToggleRow}>
              {(["cinema", "home"] as const).map((option) => (
                <Pressable
                  key={option}
                  style={watchLocation === option ? styles.logToggleActive : styles.logToggle}
                  onPress={() => setWatchLocation(option)}
                >
                  <Ionicons
                    name={option === "cinema" ? "ticket" : "home"}
                    size={16}
                    color={watchLocation === option ? colors.charcoal : colors.ink}
                  />
                  <Text style={watchLocation === option ? styles.logToggleTextActive : styles.logToggleText}>
                    {option === "cinema" ? "Cinema" : "Home"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.logField}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Rating</Text>
              <Pressable style={liked ? styles.heartButtonActive : styles.heartButton} onPress={() => setLiked(!liked)}>
                <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? colors.charcoal : colors.ink} />
              </Pressable>
            </View>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Pressable key={value} onPress={() => setRating(value)}>
                  <Ionicons
                    name={value <= rating ? "star" : "star-outline"}
                    size={30}
                    color={value <= rating ? colors.orange : colors.muted}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.logField}>
            <Text style={styles.label}>Review</Text>
            <TextInput
              multiline
              placeholder="Add a few thoughts..."
              placeholderTextColor={colors.muted}
              style={styles.reviewInput}
            />
          </View>

          <View style={styles.logField}>
            <Text style={styles.label}>Date watched</Text>
            <Pressable style={dateUnknown ? styles.dateFieldDisabled : styles.dateField}>
              <Text style={dateUnknown ? styles.dateTextDisabled : styles.dateText}>
                {dateUnknown ? "No date saved" : today}
              </Text>
              <Text style={dateUnknown ? styles.dateActionDisabled : styles.dateAction}>Change</Text>
            </Pressable>
            <Pressable style={styles.dateUnknownRow} onPress={() => setDateUnknown(!dateUnknown)}>
              <View style={dateUnknown ? styles.checkboxActive : styles.checkbox}>
                {dateUnknown && <Ionicons name="checkmark" size={14} color={colors.charcoal} />}
              </View>
              <Text style={styles.dateUnknownText}>Date unknown</Text>
            </Pressable>
          </View>

          <Pressable style={styles.logSubmitButton} onPress={onBack}>
            <Text style={styles.logSubmitText}>Log movie</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
}

function MovieCard({
  title,
  meta,
  match,
  color
}: {
  title: string;
  meta: string;
  match: string;
  color: string;
}) {
  return (
    <View style={styles.movieCard}>
      <View style={[styles.posterBlock, { backgroundColor: color }]} />
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieMeta}>{meta}</Text>
      <Text style={styles.movieMatch}>{match} match</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.charcoal
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: 116,
    paddingTop: spacing.md
  },
  logContent: {
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 188,
    height: 42
  },
  profileButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 21,
    backgroundColor: colors.card
  },
  profileInitial: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 14
  },
  feedTabs: {
    flexDirection: "row",
    alignSelf: "center",
    gap: spacing.xs,
    position: "relative",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    padding: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  feedTabIndicator: {
    position: "absolute",
    left: 4,
    top: 4,
    width: feedTabWidth,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.ink
  },
  feedTab: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 34,
    minWidth: feedTabWidth,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    zIndex: 1
  },
  feedTabActive: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 34,
    minWidth: feedTabWidth,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    zIndex: 1
  },
  feedTabText: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 13
  },
  feedTabTextActive: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 13
  },
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.sm
  },
  logHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 21,
    backgroundColor: colors.card
  },
  backButtonGhost: {
    width: 42,
    height: 42
  },
  logHeaderTitle: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 16
  },
  logHero: {
    gap: spacing.sm
  },
  logTitle: {
    maxWidth: 310,
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 28,
    lineHeight: 32
  },
  eyebrow: {
    color: colors.green,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    maxWidth: 310,
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 34,
    lineHeight: 38
  },
  subtitle: {
    maxWidth: 340,
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 22
  },
  quickLogCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(36, 210, 143, 0.42)",
    borderRadius: radii.xl,
    padding: spacing.md,
    backgroundColor: "rgba(36, 210, 143, 0.12)"
  },
  quickLogIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.green
  },
  quickLogIconText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 28,
    lineHeight: 31
  },
  quickLogText: {
    flex: 1,
    gap: 3
  },
  quickLogTitle: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 20
  },
  quickLogCopy: {
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18
  },
  quickLogArrow: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 24
  },
  quickActionRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  quickActionText: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12
  },
  featureCard: {
    position: "relative",
    gap: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: colors.card
  },
  featureCardMuted: {
    borderColor: "rgba(255, 255, 255, 0.06)",
    backgroundColor: "rgba(255, 255, 255, 0.035)",
    opacity: 0.72
  },
  featureLightBars: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 3,
    opacity: 0.13
  },
  featureLightBar: {
    width: 18,
    height: "100%"
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  featureLabel: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12,
    textTransform: "uppercase"
  },
  matchPill: {
    overflow: "hidden",
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    color: colors.charcoal,
    backgroundColor: colors.green,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12
  },
  featureTitle: {
    maxWidth: 280,
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 25,
    lineHeight: 29
  },
  featureCopy: {
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21
  },
  featureActions: {
    gap: spacing.sm
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  primaryButtonText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 14
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  secondaryButtonText: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 14
  },
  logCard: {
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: colors.card
  },
  logField: {
    gap: spacing.sm
  },
  label: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  searchInputShell: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.055)"
  },
  searchInput: {
    flex: 1,
    color: colors.ink,
    fontFamily: fonts.sansRegular,
    fontSize: 16
  },
  searchSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  searchSuggestionSelected: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(36, 210, 143, 0.42)",
    borderRadius: radii.lg,
    padding: spacing.sm,
    backgroundColor: "rgba(36, 210, 143, 0.1)"
  },
  suggestionPoster: {
    width: 42,
    height: 62,
    borderRadius: radii.sm,
    backgroundColor: colors.green,
    opacity: 0.85
  },
  logToggleRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  logToggle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  logToggleActive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minHeight: 46,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  logToggleText: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 14
  },
  logToggleTextActive: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 14
  },
  heartButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  heartButtonActive: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.orange
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  reviewInput: {
    minHeight: 112,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    color: colors.ink,
    backgroundColor: "rgba(255, 255, 255, 0.055)",
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 21,
    textAlignVertical: "top"
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  dateFieldDisabled: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.025)",
    opacity: 0.62
  },
  dateText: {
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15
  },
  dateTextDisabled: {
    color: colors.muted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15
  },
  dateAction: {
    color: colors.blue,
    fontFamily: fonts.sansExtraBold,
    fontSize: 13
  },
  dateActionDisabled: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 13
  },
  dateUnknownRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  },
  checkboxActive: {
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: colors.green
  },
  dateUnknownText: {
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14
  },
  logSubmitButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  logSubmitText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 16
  },
  goalCard: {
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: colors.slate
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 20
  },
  goalCopy: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 14
  },
  goalPercent: {
    color: colors.orange,
    fontFamily: fonts.sansExtraBold,
    fontSize: 24
  },
  progressTrack: {
    height: 10,
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  },
  progressFill: {
    width: "54%",
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.orange
  },
  goalStats: {
    flexDirection: "row",
    gap: spacing.sm
  },
  goalStat: {
    flex: 1,
    gap: 2,
    borderRadius: radii.md,
    padding: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  goalStatValue: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 18
  },
  goalStatLabel: {
    color: colors.muted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginTop: spacing.sm
  },
  sectionAction: {
    color: colors.blue,
    fontFamily: fonts.sansExtraBold,
    fontSize: 13
  },
  hStack: {
    gap: spacing.md,
    paddingRight: spacing.lg
  },
  movieCard: {
    width: 156,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.sm,
    backgroundColor: colors.card
  },
  posterBlock: {
    height: 190,
    borderRadius: radii.md,
    opacity: 0.86
  },
  movieTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 15
  },
  movieMeta: {
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 17
  },
  movieMatch: {
    color: colors.green,
    fontFamily: fonts.sansExtraBold,
    fontSize: 12
  },
  streamingList: {
    gap: spacing.sm
  },
  streamingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.sm,
    backgroundColor: colors.card
  },
  miniPoster: {
    width: 48,
    height: 64,
    borderRadius: radii.sm,
    backgroundColor: colors.blue,
    opacity: 0.78
  },
  streamingText: {
    flex: 1,
    gap: 3
  },
  streamingTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 15
  },
  streamingMeta: {
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 17
  },
  plusButton: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 24
  },
  popularGrid: {
    gap: spacing.sm
  },
  popularCard: {
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.card
  },
  popularAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5
  },
  popularTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 16
  },
  popularStat: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 13
  },
  followingList: {
    gap: spacing.sm
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.card
  },
  activityPosterWrap: {
    position: "relative",
    width: 58,
    height: 78
  },
  activityPoster: {
    width: 48,
    height: 72,
    borderRadius: radii.sm,
    opacity: 0.86
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: colors.card,
    borderRadius: 14
  },
  avatarText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11
  },
  activityBody: {
    flex: 1,
    gap: 3
  },
  activityMeta: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11,
    textTransform: "uppercase"
  },
  activityTitle: {
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 16
  },
  activityDetail: {
    color: colors.muted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18
  },
  friendHighlight: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: colors.slate
  },
  friendPosterStack: {
    width: 88,
    minHeight: 116
  },
  friendPoster: {
    position: "absolute",
    right: 34,
    bottom: 0,
    width: 48,
    height: 76,
    borderRadius: radii.sm,
    opacity: 0.88
  },
  friendPosterMiddle: {
    right: 17,
    bottom: 13
  },
  friendPosterTop: {
    right: 0,
    bottom: 26
  },
  friendListCards: {
    gap: spacing.sm
  },
  friendListCard: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.045)"
  },
  friendListCount: {
    color: colors.green,
    fontFamily: fonts.sansExtraBold,
    fontSize: 11,
    textTransform: "uppercase"
  },
  friendListTitle: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontFamily: fonts.sansBold,
    fontSize: 16
  },
  bottomNav: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: radii.xl,
    padding: spacing.xs,
    backgroundColor: "rgba(20, 26, 32, 0.78)"
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 50,
    borderRadius: radii.pill
  },
  bottomNavItemActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 50,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  bottomNavLogItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    minHeight: 52,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  bottomNavText: {
    color: colors.muted,
    fontFamily: fonts.sansExtraBold,
    fontSize: 10
  },
  bottomNavTextActive: {
    color: colors.ink,
    fontFamily: fonts.sansExtraBold,
    fontSize: 10
  },
  bottomNavLogText: {
    color: colors.charcoal,
    fontFamily: fonts.sansExtraBold,
    fontSize: 10
  }
});
