import * as model from './api-model';

export const mapWorkerToUser = (credentials: model.Worker): model.User => {
	return {
		id: credentials.id,
		name: credentials.name,
	};
};