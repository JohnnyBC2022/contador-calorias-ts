type CaloriesDisplayProps = {
  calories: number;
  text: string;
};

function CaloriesDisplay({ calories, text }: CaloriesDisplayProps) {
  return (
    <p className="text-white font-bol rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-lime-500">{calories}</span>
      {text}
    </p>
  );
}

export default CaloriesDisplay;
