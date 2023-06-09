/** @format */

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ContactClient";

const ContactPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const reservations = await getReservations({ userId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="None Found"
					subtitle="Looks like you haven't reserved any homes."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ContactPage;
