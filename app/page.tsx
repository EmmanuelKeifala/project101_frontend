/** @format */

import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import HomePage from "./components/HomePage";
// import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
	const isEmpty = true;
	const listings = await getListings();
	const currentUser = getCurrentUser();
	if (listings.length === 0) {
		<ClientOnly>
			<EmptyState showReset />
		</ClientOnly>;
	}
	return (
		<ClientOnly>
			<Container>
				<div className="">
					{/* {listings.map((listing) => {
						return (
							<ListingCard
								key={listing.id}
								data={listing}
								currentUser={currentUser}
							/>
						);

					})} */}

					{/* <BarChart /> */}
					<HomePage />

				</div>
			</Container>
		</ClientOnly>
	);
}
