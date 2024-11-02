/*
---
keep: false
---
Generated by /Users/nielsgregersjohansen/kitchens/365admin-publish/scaffold/25-generatedatabase.ps1
Do not edit this file manually
*/

--drop schema if exists "proc" cascade;

--CREATE SCHEMA if not exists "proc";
{{ template "tool_create_proc.sql".}} 
{{ template "tool_update_proc.sql".}} {{ template "tool_patch_proc.sql".}} 
{{ template "tool_delete_proc.sql".}} 
{{ template "tool_undo_delete_proc.sql".}} 
{{ template "region_create_proc.sql".}} 
{{ template "region_update_proc.sql".}} {{ template "region_patch_proc.sql".}} 
{{ template "region_delete_proc.sql".}} 
{{ template "region_undo_delete_proc.sql".}} 
{{ template "country_create_proc.sql".}} 
{{ template "country_update_proc.sql".}} {{ template "country_patch_proc.sql".}} 
{{ template "country_delete_proc.sql".}} 
{{ template "country_undo_delete_proc.sql".}} 
{{ template "user_create_proc.sql".}} 
{{ template "user_update_proc.sql".}} {{ template "user_patch_proc.sql".}} 
{{ template "user_delete_proc.sql".}} 
{{ template "user_undo_delete_proc.sql".}} 
{{ template "language_create_proc.sql".}} 
{{ template "language_update_proc.sql".}} {{ template "language_patch_proc.sql".}} 
{{ template "language_delete_proc.sql".}} 
{{ template "language_undo_delete_proc.sql".}} 
{{ template "translation_create_proc.sql".}} 
{{ template "translation_update_proc.sql".}} {{ template "translation_patch_proc.sql".}} 
{{ template "translation_delete_proc.sql".}} 
{{ template "translation_undo_delete_proc.sql".}} 
{{ template "purpose_create_proc.sql".}} 
{{ template "purpose_update_proc.sql".}} {{ template "purpose_patch_proc.sql".}} 
{{ template "purpose_delete_proc.sql".}} 
{{ template "purpose_undo_delete_proc.sql".}} 
{{ template "toolgroup_create_proc.sql".}} 
{{ template "toolgroup_update_proc.sql".}} {{ template "toolgroup_patch_proc.sql".}} 
{{ template "toolgroup_delete_proc.sql".}} 
{{ template "toolgroup_undo_delete_proc.sql".}} 
{{ template "event_create_proc.sql".}} 
{{ template "event_update_proc.sql".}} {{ template "event_patch_proc.sql".}} 
{{ template "event_delete_proc.sql".}} 
{{ template "event_undo_delete_proc.sql".}} 
{{ template "auditlog_create_proc.sql".}} 
{{ template "auditlog_update_proc.sql".}} {{ template "auditlog_patch_proc.sql".}} 
{{ template "auditlog_delete_proc.sql".}} 
{{ template "auditlog_undo_delete_proc.sql".}} 
{{ template "category_create_proc.sql".}} 
{{ template "category_update_proc.sql".}} {{ template "category_patch_proc.sql".}} 
{{ template "category_delete_proc.sql".}} 
{{ template "category_undo_delete_proc.sql".}} 

