import { useEffect, useState } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { AppStateProvider } from './context/AppStateContext';
import { initTelegram } from './lib/telegram';
import { Splash } from './screens/Splash';
import { Home } from './screens/Home';
import { Schedule } from './screens/Schedule';
import { TrainingDetail } from './screens/TrainingDetail';
import { DateTimeSelect } from './screens/DateTimeSelect';
import { BookingConfirm } from './screens/BookingConfirm';
import { BookingSuccess } from './screens/BookingSuccess';
import { MyTrainings } from './screens/MyTrainings';
import { RescheduleBooking } from './screens/RescheduleBooking';
import { Trainers } from './screens/Trainers';
import { TrainerDetail } from './screens/TrainerDetail';
import { Profile } from './screens/Profile';
import { Notifications } from './screens/Notifications';
import { Settings } from './screens/Settings';

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    initTelegram();
  }, []);

  if (!entered) {
    return <Splash onStart={() => setEntered(true)} />;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999998,
          background: '#39ff14',
          color: '#000',
          fontSize: 11,
          fontWeight: 700,
          textAlign: 'center',
          padding: '4px 8px',
          fontFamily: 'monospace',
        }}
      >
        DIAG: shell mounted · build {__BUILD_TIME__}
      </div>
      <AppStateProvider>
      {/*
        MemoryRouter — не HashRouter. Telegram сам дописывает в конец
        ссылки свои технические параметры через "#" (tgWebAppData,
        tgWebAppVersion и т.д.). HashRouter пытался бы читать этот же "#"
        как путь экрана, ничего не находил и рисовал пустой чёрный экран.
        MemoryRouter хранит текущий экран в памяти приложения, а не в
        адресной строке — конфликта с Telegram нет.
      */}
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/my-trainings" element={<MyTrainings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/training/:id" element={<TrainingDetail />} />
          <Route path="/training/:id/datetime" element={<DateTimeSelect />} />
          <Route path="/training/:id/confirm" element={<BookingConfirm />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/booking/:id/reschedule" element={<RescheduleBooking />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerDetail />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MemoryRouter>
      </AppStateProvider>
    </>
  );
}
