const SubmitBtn = ({ loading, isDisabled }) => {
	return (
		<button
			type="submit"
			className={`${
				loading ? "bg-gray-300" : "bg-[#6163EF]"
			} p-3  w-full text-white rounded-lg`}
			disabled={loading || isDisabled}
		>
			{loading ? "processing..." : "submit"}
		</button>
	);
};

export default SubmitBtn;
