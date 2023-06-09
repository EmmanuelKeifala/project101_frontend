/** @format */
"use client";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
const LoginModal = () => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const LoginModal = useLoginModal();
	const toggle = useCallback(() => {
		LoginModal.onClose();
		registerModal.onOpen();
	}, [LoginModal, registerModal]);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				LoginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};
	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading title="Welcome back!" subtitle="Create an account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			{/* <Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/> */}
			<div
				className="
	      text-neutral-500
	      text-center
	      mt-4
	      font-light
	    ">
				<p>
					First time using AptConnectSL?
					<span
						onClick={toggle}
						className="
	          text-neutral-800
	          cursor-pointer
	          hover:underline
	        ">
						{" "}
						Create an Account
					</span>
				</p>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={LoginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={LoginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
export default LoginModal;
