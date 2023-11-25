import { Notification, NotificationType } from '@prisma/client';

type ExtendedNotification = Omit<Notification, 'body'> & {
	body: string;
	sub: string;
	linkTo: string;
};

const notificationsMapper = (notification: Notification): ExtendedNotification => {
	function mapType() {
		switch (notification.type) {
			case NotificationType.ORDERCANCELLED:
				return {
					linkTo: `order/${notification.targetId}`,
					body: 'Your order has been cancelled.',
					sub: 'Click to see more.',
				};
			case NotificationType.ORDERFULFILLED:
				return {
					linkTo: `order/${notification.targetId}`,
					body: 'Your order has been fulfilled!',
					sub: 'Click to see more.',
				};
			case NotificationType.REQUEST:
				return {
					linkTo: `creator/request/${notification.targetId}`,
					body: 'You have a new request!',
					sub: 'Click to see more.',
				};
			case NotificationType.REVIEW:
				return {
					linkTo: `orders`,
					body: 'Your order has been fulfilled!',
					sub: 'Click to see more.',
				};
			default:
				return {
					linkTo: `orders`,
					body: 'You have a new message!',
					sub: 'Click to see more.',
				};
		}
	}
	const { linkTo, body, sub } = mapType();
	const { id, type, targetId, active, userId, createdAt } = { ...notification };
	return { linkTo, body, sub, id, type, targetId, active, userId, createdAt };
};

export default notificationsMapper;
