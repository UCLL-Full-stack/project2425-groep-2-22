import React from "react";
import { UserProfile } from "../../types";
import { useTranslation } from "next-i18next";

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { t } = useTranslation();
  const heightInMeters = user.height / 100;

  const calculateAdjustedBMI = (weight: number, height: number, age: number, gender: string) => {
    let baseBMI = weight / (height * height);
    let ageAdjustment = 0;
    if (gender === "male") {
      ageAdjustment = 0.1 * age / 100;
    } else {
      ageAdjustment = 0.2 * age / 100; 
    }
    return (baseBMI + ageAdjustment).toFixed(2);
  };

  const calculateIBW = (height: number, gender: string) => {
    const heightInInches = height * 0.393701;
    if (gender === "male") {
      return (50 + 2.3 * (heightInInches - 60)).toFixed(2);
    } else {
      return (45.5 + 2.3 * (heightInInches - 60)).toFixed(2);
    }
  };

  const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
    if (gender === "male") {
      return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
    } else {
      return (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
    }
  };

  const adjustedBmi = calculateAdjustedBMI(user.weight, heightInMeters, user.age, user.gender);
  const ibw = calculateIBW(user.height, user.gender);
  const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{t('profile.user.title')}</h2>
      <div className="space-y-4 text-lg">
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.fullName')}:</span> {user.firstName} {user.lastName}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.username')}:</span> {user.username}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.age')}:</span> {user.age}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.gender')}:</span> {user.gender}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.height')}:</span> {user.height} {t('profile.user.units.height')}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.info.weight')}:</span> {user.weight} {t('profile.user.units.weight')}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.metrics.bmi')}:</span> {adjustedBmi}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.metrics.ibw')}:</span> {ibw} {t('profile.user.units.weight')}
        </div>
        <div>
          <span className="font-semibold text-blue-500">{t('profile.user.metrics.bmr')}:</span> {bmr} {t('profile.user.units.bmr')}
        </div>
      </div>
    </div>
  );
};

export default Profile;
