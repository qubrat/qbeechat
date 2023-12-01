import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";

type UserInfoModalProps = {
	image?: string;
	name?: string;
	email?: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInfoModal = ({ image, name, email, visible, setVisible }: UserInfoModalProps) => {
	return (
		<Modal setVisible={setVisible} visible={visible}>
			<Avatar image={image} size="lg" />
			<p className="mt-4 text-2xl font-bold text-slate-900">{name}</p>
			<p className="mt-2 text-lg text-slate-600">{email}</p>
			<div className="absolute bottom-0 w-full h-6 bg-primary rounded-b-3xl"></div>
		</Modal>
	);
};

export default UserInfoModal;
