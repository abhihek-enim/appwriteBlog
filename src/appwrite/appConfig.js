/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import config from '../config/config'
import { Client, ID, Databases, Storage, Query } from 'appwrite'


export class Service{
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId,
                slug, {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
            })
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug,{title, content, featuredImage,status,userId}) {
        
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            throw error
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite server :: deletePost::error: ", error);
            return false;
        }
    }

    // fetching a single post. 
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost:: error: ",error);
        }
    }
    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
                
            )
            
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return await this.storage.createFile(config.appwriteBucketId,ID.unique(),file)
        
        } catch (error) {
            console.log("Error: ", error);
            return false
    }
    }
    
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
    }
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
 }



const service = new Service();

export default service;