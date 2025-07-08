import { useEffect, useState } from "react";
import { getUserProfile, getUserRole, getWalletAddress } from "../services/data";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile();
      const userRole = await getUserRole();
      const userWallet = await getWalletAddress();

      setProfile(userProfile);
      setRole(userRole);
      setWallet(userWallet);
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {profile ? (
        <>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Points:</strong> {profile.points}
          </p>
          <p>
            <strong>Wallet:</strong> {wallet}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
