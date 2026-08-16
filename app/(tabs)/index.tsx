import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const TEAL = "#14B8A6";
const DARK = "#111B4A";
const LIGHT_TEAL = "#E8FAF7";

const schools = [
  {
    name: "Baleni",
    type: "Secondary School",
    location: "Bizana",
  },
  {
    name: "Tylelimlhope",
    type: "Secondary School",
    location: "Mount Frere",
  },
  {
    name: "Toleni",
    type: "Secondary School",
    location: "Mount Frere",
  },
  {
    name: "Bonxa",
    type: "High School",
    location: "Tabankulu",
  },
  {
    name: "Dumsi Senior",
    type: "Secondary School",
    location: "Mount Frere",
  },
];

const universities = [
  {
    name: "University of Cape Town",
    location: "Cape Town",
    aps: "APS: 34+",
  },
  {
    name: "Wits University",
    location: "Johannesburg",
    aps: "APS: 36+",
  },
  {
    name: "University of Pretoria",
    location: "Pretoria",
    aps: "APS: 30+",
  },
  {
    name: "University of Johannesburg",
    location: "Johannesburg",
    aps: "APS: 30+",
  },
  {
    name: "UKZN",
    location: "Durban",
    aps: "APS: 28+",
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={34} color={DARK} />
          </TouchableOpacity>

          <Text style={styles.logoText}>IKAMVA HUB</Text>

          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={DARK}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* TAGLINE */}
        <Text style={styles.tagline}>
          Your Future. Your Choice. Your Journey.
        </Text>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              Find your school,
            </Text>

            <Text style={styles.heroTitleTeal}>
              Find your future.
            </Text>

            <Text style={styles.heroDescription}>
              Explore opportunities, discover your
              passion and build the future you deserve.
            </Text>
          </View>

          {/* STUDENT IMAGE */}
          <View style={styles.studentContainer}>
            <Image
  source={require("../../assets/images/schoolkid.png")}
  style={styles.studentImage}
/>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={27}
            color="#65709A"
          />

          <TextInput
            placeholder="Search schools, careers, bursaries..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />

          <TouchableOpacity>
            <Ionicons
              name="options-outline"
              size={28}
              color="#65709A"
            />
          </TouchableOpacity>
        </View>

        {/* QUICK OPTIONS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickScroll}
        >

          <QuickCard
            icon="school-outline"
            title="Schools"
            description="Find high schools and preparation resources."
            color={TEAL}
            onPress={() => router.push("/schools")}
          />

          <QuickCard
            icon="school-outline"
            title="Universities"
            description="Explore universities, programmes and admission requirements."
            color="#1671D9"
            onPress={() => router.push("/universities")}
          />

          <QuickCard
            icon="briefcase-outline"
            title="Careers"
            description="Discover career paths and find the right fit for you."
            color="#11A66A"
            onPress={() => router.push("/careers")}
          />

          <QuickCard
            icon="calculator-outline"
            title="APS Calculator"
            description="Calculate your APS instantly and see what you qualify for."
            color="#FF8500"
            onPress={() => router.push("/aps-calculator")}
          />

          <QuickCard
            icon="cash-outline"
            title="Bursaries"
            description="Find bursaries and funding opportunities to support your studies."
            color="#F52E63"
            onPress={() => router.push("/bursaries")}
          />

        </ScrollView>

        {/* EASTERN CAPE SCHOOLS */}
        <SectionHeader
          title="Eastern Cape Schools"
          onPress={() => router.push("/schools")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
        >
          {schools.map((school, index) => (
            <TouchableOpacity
              key={index}
              style={styles.schoolCard}
              onPress={() => router.push("/schools")}
            >
              <View style={styles.schoolIcon}>
                <Ionicons
                  name="school"
                  size={35}
                  color={TEAL}
                />
              </View>

              <Text style={styles.schoolName}>
                {school.name}
              </Text>

              <Text style={styles.schoolType}>
                {school.type}
              </Text>

              <Text style={styles.location}>
                {school.location}
              </Text>

              <View style={styles.publicBadge}>
                <Text style={styles.publicText}>
                  Public School
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* UNIVERSITIES */}
        <SectionHeader
          title="Popular Universities"
          onPress={() => router.push("/universities")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
        >
          {universities.map((university, index) => (
            <TouchableOpacity
              key={index}
              style={styles.universityCard}
              onPress={() => router.push("/universities")}
            >
              <View style={styles.universityLogo}>
                <Ionicons
                  name="school-outline"
                  size={38}
                  color={TEAL}
                />
              </View>

              <Text style={styles.universityName}>
                {university.name}
              </Text>

              <Text style={styles.location}>
                {university.location}
              </Text>

              <View style={styles.apsBadge}>
                <Text style={styles.apsText}>
                  {university.aps}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 30 }} />

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>

        <BottomButton
          icon="home"
          title="Home"
          active
          onPress={() => router.push("/")}
        />

        <BottomButton
          icon="school-outline"
          title="Schools"
          onPress={() => router.push("/schools")}
        />

        <BottomButton
          icon="school-outline"
          title="Universities"
          onPress={() => router.push("/universities")}
        />

        <BottomButton
          icon="calculator-outline"
          title="APS Calculator"
          onPress={() => router.push("/aps-calculator")}
        />

        <BottomButton
          icon="cash-outline"
          title="Bursaries"
          onPress={() => router.push("/bursaries")}
        />

      </View>
    </View>
  );
}

/* QUICK CARD */

function QuickCard({
  icon,
  title,
  description,
  color,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickCard}
      onPress={onPress}
    >
      <View
        style={[
          styles.quickIcon,
          { backgroundColor: color },
        ]}
      >
        <Ionicons
          name={icon}
          size={32}
          color="white"
        />
      </View>

      <Text
        style={[
          styles.quickTitle,
          { color },
        ]}
      >
        {title}
      </Text>

      <Text style={styles.quickDescription}>
        {description}
      </Text>

      <View
        style={[
          styles.arrowButton,
          { backgroundColor: color },
        ]}
      >
        <Ionicons
          name="arrow-forward"
          size={22}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
}

/* SECTION HEADER */

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.viewAll}>
          <Text style={styles.viewAllText}>
            View all
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color={TEAL}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

/* BOTTOM BUTTON */

function BottomButton({
  icon,
  title,
  active,
  onPress,
}: {
  icon: any;
  title: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={25}
        color={active ? TEAL : "#697397"}
      />

      <Text
        style={[
          styles.bottomText,
          active && styles.bottomTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 90,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 4,
  },

  logoText: {
    fontSize: 29,
    fontWeight: "800",
    color: TEAL,
    letterSpacing: -1,
  },

  tagline: {
    textAlign: "center",
    color: DARK,
    fontSize: 15,
    marginBottom: 8,
  },

  notificationDot: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: "#F52E63",
  },

  /* HERO */

  hero: {
    minHeight: 320,
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 40,
    paddingTop: 45,
  },

  heroText: {
    width: "65%",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: DARK,
    lineHeight: 48,
  },

  heroTitleTeal: {
    fontSize: 22,
    fontWeight: "800",
    color: TEAL,
    lineHeight: 48,
  },

  heroDescription: {
    color: DARK,
    fontSize: 14,
    lineHeight: 27,
    marginTop: 20,
  },

  studentContainer: {
    position: "absolute",
    right: -10,
    bottom: 0,
    width: 220,
    height: 260,
    borderTopLeftRadius: 130,
    overflow: "hidden",
    backgroundColor: TEAL,
  },

  studentImage: {
    width: "130%",
    height: "130%",
    borderRadius: 20,
  },

  /* SEARCH */

  searchContainer: {
    marginHorizontal: 35,
    marginTop: -5,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 12,
    color: DARK,
  },

  /* QUICK CARDS */

  quickScroll: {
    paddingHorizontal: 35,
    paddingTop: 28,
    paddingBottom: 15,
  },

  quickCard: {
    width: 175,
    minHeight: 285,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginRight: 15,
    padding: 18,

    borderWidth: 1,
    borderColor: "#E7EAF4",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  quickIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  quickTitle: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 10,
  },

  quickDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: DARK,
  },

  arrowButton: {
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 35,
    marginTop: 25,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: DARK,
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    color: TEAL,
    fontWeight: "700",
    marginRight: 5,
  },

  /* SCHOOL CARDS */

  cardsScroll: {
    paddingHorizontal: 35,
  },

  schoolCard: {
    width: 170,
    height: 230,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    marginRight: 15,
    alignItems: "center",
    padding: 15,

    borderWidth: 1,
    borderColor: "#E8EAF2",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  schoolIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: LIGHT_TEAL,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  schoolName: {
    fontSize: 16,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
  },

  schoolType: {
    fontSize: 14,
    fontWeight: "600",
    color: DARK,
    textAlign: "center",
    marginTop: 3,
  },

  location: {
    fontSize: 13,
    color: "#4F5875",
    marginTop: 7,
  },

  publicBadge: {
    backgroundColor: LIGHT_TEAL,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9,
    marginTop: 12,
  },

  publicText: {
    color: TEAL,
    fontSize: 12,
    fontWeight: "700",
  },

  /* UNIVERSITY */

  universityCard: {
    width: 170,
    height: 230,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    marginRight: 15,
    alignItems: "center",
    padding: 15,

    borderWidth: 1,
    borderColor: "#E8EAF2",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  universityLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: LIGHT_TEAL,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  universityName: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
    minHeight: 45,
  },

  apsBadge: {
    backgroundColor: LIGHT_TEAL,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 9,
    marginTop: 12,
  },

  apsText: {
    color: TEAL,
    fontWeight: "800",
    fontSize: 12,
  },

  /* BOTTOM NAV */

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
    height: 75,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 10,
  },

  bottomButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  bottomText: {
    fontSize: 10,
    marginTop: 3,
    color: "#697397",
  },

  bottomTextActive: {
    color: TEAL,
    fontWeight: "700",
  },
});