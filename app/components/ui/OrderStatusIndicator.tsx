import { FC, useCallback } from 'react';
import { OrderStatus } from '@prisma/client';
import { CircleSlash, CircleEllipsis, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface OrderStatusIndicatorProps {
	status: OrderStatus;
	size: string;
}

const OrderStatusIndicator: FC<OrderStatusIndicatorProps> = ({ status, size }) => {
	const renderStatus = useCallback(() => {
		switch (status) {
			case OrderStatus.PENDING:
				return <CircleEllipsis size={size} />;
			case OrderStatus.CANCELLED:
				return <CircleSlash size={size} />;
			case OrderStatus.FULFILLED:
				return <CheckCircle2 size={size} />;
			case OrderStatus.EXPIRED:
				return <X size={size} />;
		}
	}, [status]);

	return renderStatus();
};

export default OrderStatusIndicator;
