Error: Field 'created' doesn't have a default value
    at Packet.asError (C:\timetable\timetable\node_modules\mysql2\lib\packets\packet.js:791:17)
    at Query.execute (C:\timetable\timetable\node_modules\mysql2\lib\commands\command.js:29:26)
    at Connection.handlePacket (C:\timetable\timetable\node_modules\mysql2\lib\base\connection.js:552:34)
    at PacketParser.onPacket (C:\timetable\timetable\node_modules\mysql2\lib\base\connection.js:102:12)
    at PacketParser.executeStart (C:\timetable\timetable\node_modules\mysql2\lib\packet_parser.js:75:16)
    at Socket.`<anonymous>` (C:\timetable\timetable\node_modules\mysql2\lib\base\connection.js:109:25)
    at Socket.emit (node:events:508:28)
    at addChunk (node:internal/streams/readable:559:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    at Readable.push (node:internal/streams/readable:390:5) {
  code: 'ER_NO_DEFAULT_FOR_FIELD',
  errno: 1364,
  sqlState: 'HY000',
  sqlMessage: "Field 'created' doesn't have a default value",
  sql: `insert into post (title, content) values('1', '{\\"credit\\":3,\\"colorIndex\\":3,\\"sections\\":[{\\"id\\":1781675498325,\\"index\\":1,\\"times\\":[{\\"day\\":\\"월\\",\\"start\\":9,\\"end\\":12,\\"periodText\\":\\"1~3교시\\"}]},{\\"id\\":1781675498326,\\"index\\":2,\\"times\\":[{\\"day\\":\\"화\\",\\"start\\":9,\\"end\\":12,\\"periodText\\":\\"1~3교시\\"}]},{\\"id\\":1781675498327,\\"index\\":3,\\"times\\":[{\\"day\\":\\"수\\",\\"start\\":9,\\"end\\":12,\\"periodText\\":\\"1~3교시\\"}]}]}')`
}
