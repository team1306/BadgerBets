import {Client, Functions, ExecutionMethod} from "appwrite";

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6')


const functions = new Functions(client)

const result = await functions.createExecution("loginPoints")

console.log(result)