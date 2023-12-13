import { useChatContext } from "../../../../context/chatContext";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import Avatar from "../../../../components/Avatar";
import UserInfoModal from "../UserInfoModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { user, setUser } = useChatContext();

	const navigate = useNavigate();

	const [modalVisible, setModalVisible] = useState(false);

	const onLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
		navigate("/");
	};

	const onInfo = () => {
		setModalVisible(true);
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Button>
					<Avatar image={user?.profilePicture} status="online" />
					<Dropdown.ItemList position="right-up">
						<Dropdown.ItemList.Item onClick={onLogout} text="Log out" icon="solar:logout-2-line-duotone" />
						<Dropdown.ItemList.Item onClick={onInfo} text="Info" icon="solar:info-circle-line-duotone" />
					</Dropdown.ItemList>
				</Dropdown.Button>
			</Dropdown>
			<UserInfoModal image={user?.profilePicture} name={user?.name} email={user?.email} setVisible={setModalVisible} visible={modalVisible} />
		</>
	);
};

export default Profile;
