import BaseSeverity from '../../../base/common/severity';
import { createDecorator } from '../../instantiation/common/instantiation';
export var Severity = BaseSeverity;
export const INotificationService = createDecorator('notificationService');
export class NoOpNotification {
}
