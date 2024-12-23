import Calendar from "./components/calendar/Calendar";
import { EventProvider } from "./context/eventContext";
import { DayProvider } from "./context/dayContext";

function App() {
  return (
    <DayProvider>
      <EventProvider>
        <Calendar />
      </EventProvider>
    </DayProvider>
  );
}

export default App;
