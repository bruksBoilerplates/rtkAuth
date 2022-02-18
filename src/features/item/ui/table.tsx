import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table, Input, Popconfirm, Form, Typography, Space, Tag, Select, Alert} from 'antd';
import {RootState} from 'app/rootReducer';
import {fetchItems, updateItems, deleteItems} from "../item.reducer";


// import AddQuestion from "../../../components/add-question";
import {Query, Status} from "../../utils";



const showAlertMessages=(loadingStatus ,queryType, setAlert)=>{
    if (loadingStatus==Status.SUCCESS && queryType==Query.UPDATE) {
        setAlert({visible:true, type:"success", message:"update successful"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.UPDATE) {
        setAlert({visible:true, type:"error", message:"update Error please try again"})
    }else if (loadingStatus==Status.SUCCESS && queryType==Query.CREATE) {
        setAlert({visible:true, type:"success", message:"create successful"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.CREATE) {
        setAlert({visible:true, type:"error", message:"create Error"})
    }else if (loadingStatus==Status.SUCCESS && queryType==Query.DELETE) {
        setAlert({visible:true, type:"success", message:"deleted successfully"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.DELETE) {
        setAlert({visible:true, type:"error", message:"delete Error"})
    }
}

const EditableTable = () => {
    const dispatch = useDispatch()
    const { items, error, loadingStatus, queryType} = useSelector(
        (state: RootState) => state.items
    )
    useEffect(() => {
        if (items.length < 1) {
            dispatch(fetchItems())
            // dispatch(LOG_g("questions", questions))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, items])


    type alertType= "success" | "info" | "warning" | "error"
    const [alert, setAlert] = useState<{visible:boolean, message:string, type:alertType}>({visible:false, message:"",type:"success" });

    useEffect(() => {
        showAlertMessages(loadingStatus, queryType, setAlert)

        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
        setTimeout(() => {
            setAlert({visible:false, ...alert});
        }, 6000);

    }, [dispatch, loadingStatus])
    const handleClose = () => {
        setAlert({...alert, visible: false});
    };



    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState('');
    // const isEditing = (record) => record.id === editingKey;


    const [modalOpen, setModal]= useState(false);

    const Delete = (record) => {
        dispatch(deleteItems(record.id))
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log("row==>", row, editingKey)
            dispatch(updateItems(editingKey, row))
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
         {
            title: 'name',
            dataIndex: 'name',
            width: '70%',

        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: {  id:string }) => {


                return (
                    <Space size={"middle"}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => setModal(true)}>
                        Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={()=>Delete(record)}>
                            <a >  Delete</a>
                        </Popconfirm>

                    </Space>

                );
            },
        },
    ];


    return (
        <>
            {alert.visible ? (
                <Alert message={alert.message} type={alert.type} closable afterClose={handleClose} />
            ) : null}
            {/*<AddQuestion id={editingKey} editMode={true} isOpen={modalOpen} onClose={()=>setModal(false)}/>*/}
            <Form form={form} component={false}>
                <Table
                   bordered
                    dataSource={items}
                    columns={columns}
                    rowClassName="editable-row"
                    // pagination={{
                    //     onChange: cancel,
                    // }}
                />
            </Form>
        </>

    );
};

export default EditableTable;

