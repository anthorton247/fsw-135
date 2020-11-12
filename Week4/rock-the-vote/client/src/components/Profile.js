import React from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import Issues from './Issues.js'


export default function Profile(){
  return (
    <div className="profile">
      <h1>Welcome @Username!</h1>
      <h3>Add A Issue</h3>
      <IssueForm />
      <h3>Your Issues</h3>
    </div>
  )
}