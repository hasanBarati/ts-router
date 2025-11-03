import BoxitImage from "../shared/assets/boxit-dashboard.jpg";
export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <img width={700} src={BoxitImage}/>
    </div>
  );
};
