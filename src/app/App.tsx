import BoxitImage from "../shared/assets/boxit-dashboard.jpg";
export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <img width={700} src={BoxitImage}/>
      {/* <h1 className="text-4xl font-bold mb-4">خوش آمدید</h1>
      <p className="text-lg text-muted-foreground">به پنل مدیریت خوش آمدید</p> */}
    </div>
  );
};
