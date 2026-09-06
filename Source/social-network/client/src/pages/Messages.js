import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MessageList from '../components/Messages/MessageList';
import ChatWindow from '../components/Messages/ChatWindow';

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    background: #fff;
`;

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const loadFriends = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/friends');
                setFriends(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('获取好友列表失败:', error);
                setFriends([]);
            }
        };
        loadFriends();
    }, []);

    return (
        <PageContainer>
            <div style={{ width: 320, borderRight: '1px solid #e8e8e8' }}>
                <MessageList 
                    onSelect={setSelectedChat}
                    selectedId={selectedChat?._id}
                    friends={friends}
                />
            </div>
            {selectedChat ? (
                <ChatWindow 
                    friend={selectedChat}
                    onMessageSent={() => {}}
                />
            ) : (
                <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#999'
                }}>
                    选择一个聊天
                </div>
            )}
        </PageContainer>
    );
};

export default Messages;
