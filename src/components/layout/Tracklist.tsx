import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { DragHandleButton } from "@atlaskit/pragmatic-drag-and-drop-react-accessibility/drag-handle-button";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchplaylist } from "@/store/slices/playlist/playlist.actions";
import { ISong } from "@/types";
import {
  setCurrentPlayingTrackId,
  updatePlaylistOrder,
} from "@/store/slices/playlist/playlist.slice";

interface TrackListContextType {
  registerItem: (args: { trackId: string; element: HTMLElement }) => () => void;
  reorderTrack: (args: { startIndex: number; finishIndex: number }) => void;
  instanceId: symbol;
}

const TrackListContext = createContext<TrackListContextType | null>(null);

const useTrackListContext = () => {
  const context = useContext(TrackListContext);
  if (!context) {
    throw new Error(
      "useTrackListContext must be used within a TrackListProvider"
    );
  }
  return context;
};

const TrackItem = React.memo(
  ({ track, index }: { track: ISong; index: number }) => {
    const dispatch = useAppDispatch();
    const currentlyPlayingTrackId = useAppSelector(
      (state) => state.playlist.currentlyPlayingTrackId
    );

    const { registerItem, instanceId } = useTrackListContext();
    const ref = useRef(null);
    const [closestEdge, setClosestEdge] = useState(null);
    const dragHandleRef = useRef(null);

    useEffect(() => {
      const element = ref.current;
      const dragHandle = dragHandleRef.current;
      if (!element || !dragHandle) return;

      const data = { track, index, instanceId };

      return combine(
        registerItem({ trackId: track._id, element }),
        draggable({
          element: dragHandle,
          getInitialData: () => data,
        }),
        dropTargetForElements({
          element,
          canDrop: ({ source }) => source.data.instanceId === instanceId,
          getData: ({ input }) =>
            attachClosestEdge(data, {
              element,
              input,
              allowedEdges: ["top", "bottom"],
            }),
          onDrag: ({ self, source }) => {
            const isSource = source.element === element;
            if (isSource) {
              setClosestEdge(null);
              return;
            }
            setClosestEdge(extractClosestEdge(self.data));
          },
          onDragLeave: () => setClosestEdge(null),
          onDrop: () => setClosestEdge(null),
        })
      );
    }, [track, index, instanceId, registerItem]);

    const handleClick = () => {
      dispatch(setCurrentPlayingTrackId(track._id));
    };

    return (
      <TableRow
        ref={ref}
        className={`hover:bg-white/10 transition-colors ${
          track._id === currentlyPlayingTrackId ? "bg-red-900 text-white" : ""
        }`}
        onClick={handleClick}
      >
        <TableCell className="py-3">
          <DragHandleButton
            ref={dragHandleRef}
            label={`Reorder ${track.title}`}
          />
        </TableCell>
        <TableCell className="py-3">{index + 1}</TableCell>
        <TableCell className="py-3 flex items-center">
          <img
            src={track?.image}
            alt={track.title}
            className="w-10 h-10 mr-3"
          />
          {track.title}
        </TableCell>
        <TableCell className="py-3">{track?.plays ?? 0}</TableCell>
        <TableCell className="py-3">{track?.length ?? 0}</TableCell>
        <TableCell className="py-3">{track.album}</TableCell>
        {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
      </TableRow>
    );
  }
);

const TrackList = () => {
  const dispatch = useAppDispatch();
  const playlist = useAppSelector(
    (state) => state?.playlist?.playlist[0]?.songs || []
  );

  const [instanceId] = useState(() => Symbol("instance-id"));

  const reorderTrack = useCallback(
    ({
      startIndex,
      finishIndex,
    }: {
      startIndex: number;
      finishIndex: number;
    }) => {
      const newPlaylist = reorder({
        list: playlist,
        startIndex,
        finishIndex,
      });
      dispatch(updatePlaylistOrder(newPlaylist));
    },
    [playlist, dispatch]
  );

  useEffect(() => {
    dispatch(fetchplaylist());
  }, []);

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => source.data.instanceId === instanceId,
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceIndex = source.data.index;
        const targetIndex = playlist.findIndex(
          (track: ISong) => track._id === target?.data?.track?._id
        );
        const closestEdgeOfTarget = extractClosestEdge(target.data);

        const finishIndex = getReorderDestinationIndex({
          startIndex: sourceIndex as number,
          indexOfTarget: targetIndex,
          closestEdgeOfTarget,
          axis: "vertical",
        });

        reorderTrack({ startIndex: sourceIndex as number, finishIndex });
      },
    });
  }, [instanceId, playlist, reorderTrack]);

  const registerItem = useCallback(
    ({ trackId, element }: { trackId: string; element: HTMLElement }) => {
      console.log(trackId, element);
      return () => {};
    },
    []
  );

  const contextValue = {
    registerItem,
    reorderTrack,
    instanceId,
  };

  return (
    <TrackListContext.Provider value={contextValue}>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Popular</h2>
          <button className="text-gray-400 hover:text-white">See All</button>
        </div>
        <Table className="w-full text-left text-gray-300">
          <TableRow className="border-b border-gray-700">
            <TableHead className="pb-2 font-normal text-gray-400">#</TableHead>
            <TableHead className="pb-2 font-normal text-gray-400">
              TITLE
            </TableHead>
            <TableHead className="pb-2 font-normal text-gray-400">
              PLAYING
            </TableHead>
            <TableHead className="pb-2 font-normal text-gray-400">
              TIME
            </TableHead>
            <TableHead className="pb-2 font-normal text-gray-400">
              ALBUM
            </TableHead>
          </TableRow>
          <TableBody>
            {playlist.map((track, index) => (
              <TrackItem key={track._id} track={track} index={index} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TrackListContext.Provider>
  );
};

export default TrackList;
