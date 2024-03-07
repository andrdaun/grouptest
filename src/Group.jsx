import { useState } from 'react';
import './Group.css';

export const Group = ({ data }) => {
	const [showFriends, setShowFriends] = useState(false);

	const handleFriendsClick = () => setShowFriends(prev => !prev);

	return (
		<div className='group'>
			{!!data.avatar_color ? (
				<div
					className='avatar'
					style={{ backgroundColor: data.avatar_color }}
				/>
			) : (
				<div className='none-avatar' />
			)}
			<div className='body'>
				<div className='header'>{data.name}</div>
				<div className='content'>
					<span className='privacy'>
						{data.closed ? 'Закрытая' : 'Открытая'}
					</span>
					<span className='followers'>Подписчики: {data.members_count}</span>
					{!!data.friends?.length && (
						<span onClick={handleFriendsClick} className='friends'>
							Друзья: {data.friends.length}
							{showFriends && (
								<div className='friends-list'>
									{data.friends?.map(friend => (
										<div className='friend'>
											<span>{`Имя: ${friend.first_name}`}</span>
											<span>{`Фамилия: ${friend.last_name}`}</span>
										</div>
									))}
								</div>
							)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
