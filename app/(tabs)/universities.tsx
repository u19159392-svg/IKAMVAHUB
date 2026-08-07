import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getTvetColleges, getUniversities } from '../db/ReferenceDatabase';

export default function UniversitiesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'university' | 'college'>('university');
  const [searchText, setSearchText] = useState('');
  const [universities, setUniversities] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const uniData = await getUniversities();
    const collegeData = await getTvetColleges();
    setUniversities(uniData);
    setColleges(collegeData);
  };

  const activeData = activeTab === 'university' ? universities : colleges;

  const filteredData = activeData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const groupedByProvince = filteredData.reduce((groups: Record<string, any[]>, item) => {
    const province = item.province || 'Other';
    if (!groups[province]) groups[province] = [];
    groups[province].push(item);
    return groups;
  }, {});

  const provinces = Object.keys(groupedByProvince).sort();

  const handleCardPress = (item: any) => {
    router.push({
      pathname: '/university-detail',
      params: { id: item.id, name: item.name, type: activeTab },
    });
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search universities or colleges..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'university' && styles.toggleButtonActive]}
          onPress={() => setActiveTab('university')}
        >
          <Text style={[styles.toggleText, activeTab === 'university' && styles.toggleTextActive]}>
            Universities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'college' && styles.toggleButtonActive]}
          onPress={() => setActiveTab('college')}
        >
          <Text style={[styles.toggleText, activeTab === 'college' && styles.toggleTextActive]}>
            Colleges
          </Text>
        </TouchableOpacity>
      </View>

      {/* Province sections */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {provinces.length === 0 && (
          <Text style={styles.emptyText}>No results found.</Text>
        )}
        {provinces.map((province) => (
          <View key={province} style={styles.provinceSection}>
            <Text style={styles.provinceHeader}>{province}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardRow}
            >
              {groupedByProvince[province].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => handleCardPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.logoContainer}>
                    {item.image_url ? (
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoPlaceholderText}>
                          {item.name.charAt(0)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color="#888" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {item.city || item.province}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  toggleTextActive: {
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 14,
  },
  provinceSection: {
    marginBottom: 24,
  },
  provinceHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 16,
    marginBottom: 12,
  },
  cardRow: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  card: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginRight: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  logoContainer: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#999',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
});
