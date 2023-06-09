/** @format */

"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useDeathApplyModal from "@/app/hooks/useDeathApplyModal";

import Modal from "./Modal";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import GenderSelect, { GenderOption } from "../inputs/Gender";
import PlaceOfBirthSelectComponent from "../inputs/PlaceOfBirthSelectComponent";

enum STEPS {
	CATEGORY = 0,
	FULLNAME = 1,
	DOB = 2,
	LOCATION = 3,
	ADDRESS = 4,
	GENDER = 5,
	FILES = 6,
	PARENTS = 7,
	PARENTS_NUMBER = 8,
	DESCRIPTION = 9,


}

const DeathModal = () => {
	const router = useRouter();
	const deathModal = useDeathApplyModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "birth",
			location: null,
			gender: null,
			fileSrc: "",
			fullname: "",
			reason: "",
			description: "",
			address: "",
			dob: "",
			parent_1: "",
			parent_2: "",
			guardians_phone: null
		},
	});

	const location = watch("location");
	const gender = watch("gender");
	// const category = watch("category");
	const fileSrc = watch("fileSrc");
	const dob = watch("dob");

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location],
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.DESCRIPTION) {
			return onNext();
		}

		setIsLoading(true);

		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Your application have being sent for processing!");
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				deathModal.onClose();
			})
			.catch(() => {
				toast.error("Something went wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.DESCRIPTION) {
			return "Create";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="This is a form for death certificate application please fill it out with sincerity"
			/>
			{/* <div
				className="grid grid-cols-1 md:grid-cols-2 gap-3max-h-[50vh]overflow-y-auto">
				{categoryOption.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							onClick={(category) => setCustomValue("category", category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div> */}
		</div>
	);
	if (step === STEPS.FULLNAME) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="What is your Full Name"
					subtitle="This will be the name that will be printed on the certificate"
				/>
				<Input
					id="fullname"
					label="Name"
					type="text"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.DOB) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Enter your date of birth"
					subtitle="This will be logged in our systems so please choose with caution"
				/>
				<input type="date" value={dob} onChange={(event) => setCustomValue("dob", event.target.value)} required />
			</div>
		);
	}
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where are you presently"
					subtitle="Help us locate you"
				/>
				<PlaceOfBirthSelectComponent
					value={location}
					onChange={(value) => setCustomValue("location", value)} />
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.ADDRESS) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="What is your current residential address"
					subtitle="Home Address"
				/>
				<Input
					id="address"
					label="Current Address"
					type="text"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.GENDER) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Your Gender"
				// subtitle="What amenitis does it have"
				/>
				<hr />
				<GenderSelect onChange={(value) => setCustomValue("gender", value)} value={gender} />
			</div>
		);
	}

	if (step === STEPS.FILES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Please add a document to validate your citizenship"
					subtitle="Like you Driver's license or any authentic document"

				/>
				<ImageUpload
					onChange={(value) => setCustomValue("fileSrc", value)}
					value={fileSrc}
				/>
			</div>
		);
	}

	if (step === STEPS.PARENTS) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Name of both parents"
					subtitle="Parent Names"
				/>
				<Input
					id="parent_1"
					label="Father's Name"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="parent_2"
					label="Mother's Name"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.PARENTS_NUMBER) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Phone number to contact parents"
					subtitle="Parent's Phone Number"
				/>
				<Input
					id="guardians_phone"
					label="Number"
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.ADDRESS) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="What is your current residential address"
					subtitle="Home Address"
				/>
				<Input
					id="address"
					label="Current Address"
					type="text"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Reason for requesting the birth certificate"
				/>
				<Input
					id="reason"
					label="Reason"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Relationship to the person named on the birth certificate"
					disabled={isLoading}
					register={register}
					errors={errors}
				/>
				<p><b>NOTE: </b> An email will be sent with instructions on how to send scanned documents to support this application</p>
			</div>
		);
	}



	return (
		<Modal
			disabled={isLoading}
			isOpen={deathModal.isOpen}
			title="Application"
			actionLabel={actionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onClose={deathModal.onClose}
			body={bodyContent}
		/>
	);
};

export default DeathModal;
