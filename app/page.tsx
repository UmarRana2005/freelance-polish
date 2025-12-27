import APITest from "@/components/APITest";
import LanguageToogle from "@/components/LanguageToogle";
import TextBox from "@/components/TextBox";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-5 px-4 flex flex-col items-center justify-center gap-5">
      <LanguageToogle />
      <div className="w-full flex items-center justify-center gap-10">
        <TextBox />
        <TextBox />
      </div>
      <APITest />
    </div>
  );
}
