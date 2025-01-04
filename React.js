import React from "https://esm.sh/react@17";
import ReactDOM from "https://esm.sh/react-dom@17";

function getTimeDigits() {
  const now = new Date();
  const digits = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };

  return digits;
}

function CircleNumbers({ number, angleIndex, size }) {
  const stepAngle = 360 / number;
  const [angle, setAngle] = React.useState(angleIndex * stepAngle);

  React.useEffect(() => {
    setAngle((angle) => angleIndex * stepAngle);
  }, [angleIndex]);

  const radius = size / 2;
  const center = size / 2;
  const numberSize = size * 0.1;
  const numbers = Array.from({ length: number }, (_, i) =>
                             String(i).padStart(2, "0")
                            );

  return (
    <div
      className="ClockCircle"
      style={{
        width: `${size}px`,
          height: `${size}px`,
            transform: `rotate(${angle}deg)`,
      }}
      >
      {numbers.map((num, index) => {
        const a = (index / number) * 2 * Math.PI;
        const x = center + radius * Math.sin(a);
        const y = center - radius * Math.cos(a);

        return (
          <div
            key={num}
            className={`ClockCircleNumber ${
            Math.abs(angleIndex) === parseInt(num) ? "selected" : ""
                      }`}
            style={{
              width: `${numberSize}px`,
                height: `${numberSize}px`,
                  lineHeight: `${numberSize}px`,
                    left: `${x}px`,
                      top: `${y}px`,
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
            }}
            >
            {num}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  
  React.useEffect(() => {
    if (typeof addVideoLinks === "function") {
      addVideoLinks("7443865247158488342", "Tyex-a26AvA", "#35c4ff");
    }
  }, []);
  
  const [hours, setHours] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);
  const [seconds, setSeconds] = React.useState(null);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const { hours: h, minutes: m, seconds: s } = getTimeDigits();
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
  }, []);

  const clockSize = 800;

  return (
    <main>
      <ul className="Clock" style={{ "--clock-size": `${clockSize}px` }}>
        <li>
          {hours !== null && (
            <CircleNumbers
              number={24}
              angleIndex={0 - hours}
              size={clockSize}
              />
          )}
        </li>
        <li>
          {minutes !== null && (
            <CircleNumbers
              number={60}
              angleIndex={0 - minutes}
              size={clockSize}
              />
          )}
        </li>
        <li>
          {seconds !== null && (
            <CircleNumbers
              number={60}
              angleIndex={0 - seconds}
              size={clockSize}
              />
          )}
        </li>
      </ul>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
