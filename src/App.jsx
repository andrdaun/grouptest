import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Group } from './Group';
import groups from './groups.json';

function App() {
	const [state, setState] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [filters, setFilters] = useState({
		hasFriends: false,
		color: 'any',
		privacy: 'all',
	});

	const handleSetFilter = (field, value) => {
		setFilters(prev => ({
			...prev,
			[field]: value,
		}));
	};

	useEffect(() => {
		setIsLoading(true);
		fetch('').then(() => {
			setTimeout(() => {
				setState(groups);
				setIsLoading(false);
			}, 1000);
		});
	}, []);

	const isErrorData = !state || !state.data || state.result === 0;

	const avatarColors = useMemo(() => {
		if (state?.data) {
			return [
				...new Set(
					state.data
						.filter(item => item.avatar_color)
						.map(item => item.avatar_color)
				),
			];
		}
		return [];
	}, [state]);

	const contentData = useMemo(() => {
		if (state?.data) {
			return state?.data
				.filter(item => !filters.hasFriends || !!item.friends?.length)
				.filter(
					item => filters.color === 'any' || item.avatar_color === filters.color
				)
				.filter(
					item => filters.privacy === 'all' || item.closed === filters.privacy
				);
		}
		return [];
	}, [state, filters]);
	if (isLoading) return <div>Загрузка данных ...</div>;

	return (
		<div className='app'>
			{isErrorData ? (
				'Ошибка получения данных'
			) : (
				<div className='app-content'>
					<div className='filters'>
						<div>
							<div>Тип приватности</div>
							<select
								className='privacy-filter'
								value={filters.privacy}
								onChange={e => {
									const value = e.currentTarget.value;
									const preparedValue = value === 'true';
									handleSetFilter(
										'privacy',
										value === 'all' ? value : preparedValue
									);
								}}
							>
								<option value='all'>Все</option>
								<option value={true}>Закрытая</option>
								<option value={false}>Открытая</option>
							</select>
						</div>
						<div>
							<div>Цвет</div>
							<select
								className='color-filter'
								value={filters.color}
								onChange={e => {
									handleSetFilter('color', e.currentTarget.value);
								}}
							>
								<option value='any'>Любой</option>
								{avatarColors.map(color => (
									<option key={`${color}-key`} value={color}>
										{color}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor='filter-friends'>Наличие друзей</label>
							<input
								type='checkbox'
								id='filter-friends'
								checked={filters.hasFriends}
								onChange={e => {
									handleSetFilter('hasFriends', e.currentTarget.checked);
								}}
							/>
						</div>
					</div>
					{contentData.map(item => (
						<Group key={`${item.id}-${item.name}`} data={item} />
					))}
				</div>
			)}
		</div>
	);
}

export default App;
