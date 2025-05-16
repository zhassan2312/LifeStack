const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center p-40">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-12 mb-24">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-16 bg-(--color-primary-10)  ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
          <h2 className="text-24 font-bold mb-16">{title}</h2>
          <p className="text-(--color-black-60)">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;