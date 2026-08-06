// app/utils/apsStorage.ts
//
// Saves and reads the learner's most recent APS calculation using AsyncStorage
// (phone-local key-value storage — separate from your SQLite databases).
//
// If you don't have this package yet, install it with:
//   npx expo install @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';

const APS_RESULT_KEY = 'lastApsResult';

export type SubjectResult = {
  subject: string;
  mark: number;
  points: number;
};

export type ApsResult = {
  total: number;
  breakdown: SubjectResult[];
  calculatedAt: string; // ISO date string, so screens can show "last calculated on..."
};

/**
 * Saves the learner's APS result. Overwrites whatever was saved before —
 * so recalculating always replaces the old value, nothing goes stale.
 */
export const saveApsResult = async (
  total: number,
  breakdown: SubjectResult[],
): Promise<void> => {
  try {
    const result: ApsResult = {
      total,
      breakdown,
      calculatedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(APS_RESULT_KEY, JSON.stringify(result));
  } catch (error) {
    console.error('❌ Save APS result error:', error);
  }
};

/**
 * Reads the learner's most recent APS result, or null if they haven't
 * calculated one yet.
 */
export const getApsResult = async (): Promise<ApsResult | null> => {
  try {
    const raw = await AsyncStorage.getItem(APS_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ApsResult;
  } catch (error) {
    console.error('❌ Get APS result error:', error);
    return null;
  }
};

/**
 * Clears the saved APS result (e.g. if you add a "reset" option later).
 */
export const clearApsResult = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(APS_RESULT_KEY);
  } catch (error) {
    console.error('❌ Clear APS result error:', error);
  }
};