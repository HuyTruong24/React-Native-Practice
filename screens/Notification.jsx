import React, { useCallback, useRef, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import NotificationItem from '../components/NotificationItem'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const data = [
  { 
    id: 1, 
    title: 'New Message',
    description: 'You have a new message from John.', 
    time: '5 min ago'
  },
  {
    id: 2, 
    title: 'Meeting Reminder',
    description: 'Your meeting with the team starts in 30 minutes.', 
    time: '30 min ago',
  },
  {
    id: 3, 
    title: 'Update Available',
    description: 'A new version of the app is available for download.', 
    time: '2h ago',
  },
  {
    id: 4, 
    title: 'Friend Request',
    description: 'Sarah has sent you a friend request.', 
    time: '9h ago',
  },
  {
    id: 5, 
    title: 'Weekly Report', 
    description: 'Your weekly activity report is ready.', 
    time: 'now'
  },
  {
    id: 6,
    title: 'System Alert',
    description: 'Unusual login attempt detected from a new device.',
    time: '12h ago',
  },
  {
    id: 7,
    title: 'Event Invitation',
    description: 'You have been invited to Anna’s birthday party.',
    time: '1d ago',
  },
  {
    id: 8,
    title: 'Backup Complete',
    description: 'Your cloud backup was completed successfully.',
    time: '2d ago',
  },
  {
    id: 9,
    title: 'Payment Received',
    description: 'You received $50 from PayPal.',
    time: '3d ago',
  },
  {
    id: 10,
    title: 'Achievement Unlocked',
    description: 'Congratulations! You reached Level 10 in Fitness Challenge.',
    time: '5d ago',
  }
];



function Notification() {
    const [notifications, setNotifications] = useState(data)
    const scrollRef = useRef(null)

    const onDeleteItem = useCallback((id) => {
      setNotifications(currNotifications => currNotifications.filter(_item => _item.id !== id))
    }, [])

    const notificationItems = notifications.map((item, index) => 
        <NotificationItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          time={item.time}
          onDelete = {onDeleteItem}
        />
    )

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <ScrollView 
          ref={scrollRef} 
          contentInsetAdjustmentBehavior="automatic" //condition to make title collapse when scrolling
          >{notificationItems}</ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Notification