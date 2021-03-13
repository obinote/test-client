import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getContact, storeContact, contactList, postContact, onInputCahnge } from './ContactSlice'

import { 
  Form,
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  InputNumber,
  ButtonToolbar,
  FlexboxGrid,
  Divider,
  Button,
  Icon,
  Table
} from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;

export default function Contact() {
  const dispatch = useDispatch();
  const listContact = useSelector(contactList);
  const post = useSelector(postContact);

  useEffect(() => {
    dispatch(getContact())
  }, [post.submited])

  const onChanged = (data) => {
    dispatch(onInputCahnge(data));
  };

  const commit = () => {
    dispatch(storeContact(post))
  }

  return (
    <Fragment>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          {/* Form input */}
          <Panel header={<h3>Add Contact</h3>} bordered>
          <Form fluid>
            <FormGroup>
              <ControlLabel>Name : </ControlLabel>
              <FormControl
                name="name"
                value={post.name}
                onChange={(val) => onChanged({name : "name", value: val})}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Age</ControlLabel>
              <FormControl
                name="age"
                value={post.age}
                onChange={(val) => onChanged({name : "age", value: val})}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>City</ControlLabel>
              <FormControl
                name="city"
                rows={3} 
                componentClass="textarea"
                value={post.city}
                onChange={(val) => onChanged({name : "city", value: val})}
              />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button 
                  color="blue" 
                  appearance="primary" 
                  onClick={commit}
                >
                  <Icon icon="plus"  /> Submit
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Divider></Divider>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
          {/* Display Data From Database */}
          <Table
            virtualized
            height={200}
            data={listContact}
            onRowClick={data => {
              console.log(data);
            }}
          >
            <Column width={130}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={130}>
              <HeaderCell>Age</HeaderCell>
              <Cell dataKey="age" />
            </Column>

            <Column width={200}>
              <HeaderCell>City</HeaderCell>
              <Cell dataKey="city" />
            </Column>
          </Table>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Fragment>
  )
}
