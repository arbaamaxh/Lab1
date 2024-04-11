{"_type":"export","__export_format":4,"__export_date":"2024-04-11T12:41:05.111Z","__export_source":"insomnia.desktop.app:v8.6.1","resources":[{"_id":"req_40311d9420d14402ac98aead66e12be6","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712579838077,"created":1712579796400,"url":"http://localhost:3001/patients/1234567890","name":"updateDoctors","description":"","method":"PUT","body":{"mimeType":"application/json","text":"{\n\t\"emri\": \"arba\",\n\t\"mbiemri\": \"maxhuni\",\n\t\"nrPersonal\": \"1234567890\",\n\t\"adresa\": \"drd\",\n\t\"nrTel\": \"045435888\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/8.6.1"}],"authentication":{},"metaSortKey":-1712579796400,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"wrk_a940bdb39cff496baf061aa5203f0f4a","parentId":null,"modified":1712578906796,"created":1712578906796,"name":"My Collection","description":"","scope":"collection","_type":"workspace"},{"_id":"req_15311acc834c49deaa05186015cc3e76","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712579794329,"created":1712579766184,"url":"http://localhost:3001/doctors/1234567890","name":"deleteDoctor","description":"","method":"DELETE","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/8.6.1"}],"authentication":{},"metaSortKey":-1712579766184,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_434755cb2f8748799dcdf7cafa769d73","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712579736867,"created":1712579714325,"url":"http://localhost:3001/doctors","name":"getDoctors","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/8.6.1"}],"authentication":{},"metaSortKey":-1712579714325,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_76b4bf2f75f54e639c9f9a41910a19d2","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712579706420,"created":1712579535551,"url":"http://localhost:3001/doctors","name":"createDoctor","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n\t\"emri\": \"arba\",\n\t\"mbiemri\": \"maxhuni\",\n\t\"nrPersonal\": \"1234567890\",\n\t\"adresa\": \"drd\",\n\t\"nrTel\": \"045435888\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/8.6.1"}],"authentication":{},"metaSortKey":-1712579535551,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"env_2e0efa456b79e0146b09a72e18e96faeecefdb67","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712578906799,"created":1712578906799,"name":"Base Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1712578906799,"_type":"environment"},{"_id":"jar_2e0efa456b79e0146b09a72e18e96faeecefdb67","parentId":"wrk_a940bdb39cff496baf061aa5203f0f4a","modified":1712578906801,"created":1712578906801,"name":"Default Jar","cookies":[],"_type":"cookie_jar"}]}