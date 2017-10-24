import { observable } from 'mobx'
import attendanceRecord from '../../components/models/attendanceRecord'

class AttendanceState {
    tableConfig = observable({
        dataSource1: [],
        dataSource2: [],
        columns: [
            { title: 'id', dataIndex: 'id', key: 'id' },
            { title: '考勤时间', dataIndex: 'yyyyMMdd', key: 'yyyyMMdd' }
        ],
        className: 'signRecordTable',
        emptyText: observable.ref(() => '还没有记录哦')
    })

    tabsConfig = observable({
        defaultActiveKey: '1',
        className: 'tabs',
        onChange: observable.ref((key) => {
            console.log(key)
        })
    })

    async signIn() {
        new attendanceRecord({
            timestamp: Date.now()
        }).save()
        this.initDataSource()
    }

    async initDataSource() {
        this.tableConfig.dataSource1 = await attendanceRecord.getAttendanceRecordsByTimestamp(new Date(new Date().Format('yyyy/MM/dd')).getTime())
        this.tableConfig.dataSource2 = await attendanceRecord.getAttendanceRecordsByTimestamp()
    }
}

export default AttendanceState