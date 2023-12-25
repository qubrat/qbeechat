import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import Avatar from "../../../../components/Avatar";
import UserInfoModal from "../UserInfoModal";
import { useState } from "react";
import useLogout from "../../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../../../../stores/authStore";
import { useUserAPI } from "../../../../apis/userAPI";

const Profile = () => {
	const { getUser } = useUserAPI();

	const userId = useUserData()?.id;

	const { data: user, isLoading } = useQuery({
		queryFn: () => getUser(userId!),
		queryKey: ["loggedUser", userId],
	});

	const logout = useLogout();
	const navigate = useNavigate();

	const [modalVisible, setModalVisible] = useState(false);

	const onLogout = async () => {
		await logout();
		navigate("/login", { replace: true });
	};

	const onInfo = () => {
		setModalVisible(true);
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Button>
					<Avatar image={user?.profilePicture} status="online" loading={isLoading} />
					<Dropdown.ItemList position="right-up">
						<Dropdown.ItemList.Item onClick={onLogout} text="Log out" icon="solar:logout-2-line-duotone" />
						<Dropdown.ItemList.Item onClick={onInfo} text="Info" icon="solar:info-circle-line-duotone" />
					</Dropdown.ItemList>
				</Dropdown.Button>
			</Dropdown>
			{modalVisible && (
				<UserInfoModal
					image={user?.profilePicture}
					name={user?.name}
					email={user?.email}
					setVisible={setModalVisible}
					visible={modalVisible}
				/>
			)}
		</>
	);
};

export default Profile;
