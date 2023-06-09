/** @format */

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const {
		reason,
		description,
		fileSrc,
		category,
		parent_1,
		parent_2,
		location,
		gender,
		fullname,
		dob,
		address,
	} = body;
	const email = currentUser.email?.toString();
	const guardians_phone = String(body.guardians_phone);

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			reason,
			description,
			fileSrc,
			category,
			parent_1,
			parent_2,
			locationValue: location.value,
			gender: gender.value,
			guardians_phone,
			fullname,
			email,
			dob,
			address,
			userId: currentUser.id,
			status: "pending", // Set the default status as "pending"
		},
	});

	return NextResponse.json(listing);
}
