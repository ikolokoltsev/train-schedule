import { getProfile } from "@/lib/actions";

const Profile = async () => {
  const result = await getProfile();
  return (
    <div>
      Profile Page
      <p>{JSON.stringify(result)}</p>
    </div>
  );
};

export default Profile;
