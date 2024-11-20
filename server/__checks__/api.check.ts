import { ApiCheck, AssertionBuilder, EmailAlertChannel, CheckGroup } from 'checkly/constructs'
import * as path from 'path';

const alertUsers = [
  {email:'syedgulmohd25794@gmail.com',name:'syed'},
  {email:'syedgulmohammad25794@gmail.com', name: 'samad'}
];
const alertChannels = alertUsers.map((alertUser)=>(
  new EmailAlertChannel(`email-alert-to-${alertUser.name}`,{
    address: alertUser.email,
  })
))

const notesAPIGroup = new CheckGroup('Notes-APIs', {
  name: 'Notes-APIs-Group'
})
// check for get request of notes fetching
new ApiCheck('notes-api-check-1', {
  name: 'Fetch Notes',
  group: notesAPIGroup,
  alertChannels,
  degradedResponseTime: 10000,
  maxResponseTime: 50000,
  request: {
    url: 'https://wisereco.onrender.com/notes/getNotes',
    method: 'GET',
    queryParameters: [
      { 
        key: 'page',
        value: '1'
      }
    ],
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody().isNotNull()
    ]
  },
  runParallel: true
})

// // check for post request of note creating
new ApiCheck('notes-api-check-2',{
  name: 'Create Note',
  group: notesAPIGroup,
  tearDownScript: {entrypoint :path.join(__dirname,'./utils/teardown.ts')},
  alertChannels,
  degradedResponseTime: 10000,
  maxResponseTime: 50000,
  runParallel: true,
  request: {
    url: 'https://wisereco.onrender.com/notes/createNote',
    body: JSON.stringify({ 
      title:'This is test title',
      tagline:'This is test tagline',
      text:'This is test text'
    }),
    bodyType: 'JSON',
    method: 'POST',
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(201),
      AssertionBuilder.jsonBody().isNotNull()
    ]
  }
})

// check for delete request of note delete
new ApiCheck('notes-api-check-3', {
  name: 'Delete Note',
  group: notesAPIGroup,
  setupScript: { entrypoint: path.join(__dirname,'./utils/getId.ts')},
  alertChannels,
  degradedResponseTime: 10000,
  maxResponseTime: 50000,
  runParallel: true, 
  request: {
    url: "https://wisereco.onrender.com/notes/deleteNote",
    method: 'DELETE',
    skipSSL: false,
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody().isNotNull()
    ]
  }
})

// check for patch request of note update
new ApiCheck('notes-api-check-4',{
  name: 'Update Note',
  group: notesAPIGroup,
  setupScript: { entrypoint: path.join(__dirname, './utils/getId.ts')},
  alertChannels,
  degradedResponseTime: 10000,
  maxResponseTime: 50000,
  runParallel: true,
  request: {
    url: 'https://wisereco.onrender.com/notes/updateNote',
    method: 'PATCH',
    body: JSON.stringify({ 
      title:'This is test updated title',
      tagline:'This is test updated tagline',
      text:'This is test updated text',
      isPinned: true
    }),
    skipSSL: false,
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody().isNotNull()
    ]
  }
})
