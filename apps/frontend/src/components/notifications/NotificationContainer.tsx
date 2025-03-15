'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeNotification } from '@/slices/notificationsSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Triangle, X } from 'lucide-react';

const icons = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  warning: <Triangle className="h-5 w-5 text-yellow-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
};

export default function NotificationContainer() {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = notifications.map((notif) =>
      setTimeout(() => {
        dispatch(removeNotification(notif.id));
      }, 3000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, dispatch]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 w-100 z-[9999]">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 rounded-lg border border-gray-300 bg-white p-4 shadow-lg relative">
            {icons[notif.type]}
            <div className="flex-1">
              <p className="font-bold capitalize text-gray-800">{notif.type}</p>
              <p className="text-gray-600">{notif.message}</p>
            </div>
            <button
              onClick={() => dispatch(removeNotification(notif.id))}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
