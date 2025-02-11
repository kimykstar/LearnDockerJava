type QuizInputBoxProps = {
    answer: string;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const QuizInputBox = ({ answer, setAnswer }: QuizInputBoxProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };
    return (
        <div className='flex justify-end'>
            <input
                className='h-9 w-72 rounded-lg border border-gray-300 outline-none bg-gray-50'
                type='text'
                onChange={handleChange}
                value={answer}
                placeholder='정답을 입력해주세요.'
            />
        </div>
    );
};

export default QuizInputBox;
