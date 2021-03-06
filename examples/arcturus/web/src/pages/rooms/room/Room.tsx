import './Room.scss';
import { Room } from 'instinct-interfaces';
import { defaultRoomState, RoomState } from './';
import { Link, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Column, Container, Jumbotron, Loading, SessionContext, clientService, roomService, UserLayout, setURL } from 'instinct-frontend';

setURL('rooms/:roomID', <RoomPage />);

export function RoomPage() {
  const sessionContext = useContext(SessionContext);
  const { roomID } = useParams<Record<'roomID', string>>();
  const [state, setState] = useState<RoomState>(defaultRoomState);

  useEffect(() => {
    async function fetchRoom(): Promise<void> {
      const room: Room = await roomService.getByID(Number(roomID));
      setState({
        room,
        showSpinner: false,
      });
    }

    setState(defaultRoomState);
    fetchRoom();
  }, [roomID]);

  function enterRoom(): void {
    clientService.enterRoom(state.room!.id);
  }

  return (
    <UserLayout section="community_rooms">
      <Jumbotron title={state.room?.name}>
        Owned by <Link to={`/profile/${state.room?.user?.username}`}>{state.room?.user?.username}</Link>
      </Jumbotron>
      <Loading isLoading={state.showSpinner}>
        <Container>
          <Column side="left">
            <Card header="Room Information">
              <ul>
                <li>Max Users: <b>{state.room?.maxUsers}</b></li>
                <li>Current Users: <b>{state.room?.currentUsers}</b></li>
              </ul>
              <button className="rounded-button blue plain" disabled={!sessionContext.user?.online} onClick={enterRoom}>Enter Room</button>
            </Card>
          </Column>
        </Container>
      </Loading>
    </UserLayout>
  );
}
