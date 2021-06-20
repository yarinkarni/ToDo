using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ToDoWebAPI.Models;

namespace ToDoWebAPI.Controllers
{
    [EnableCors("*", "*", "*")]

    public class TaskController : ApiController
    {
        //http://localhost:64896/getAllDishes
        [Route("GetAllTasks")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(TaskDB.GetAllTasks());
            }
            catch (Exception ex)
            {
                return BadRequest("could not get all the Tasks ! \n  --" + ex.Message);
            }
        }
        //http://localhost:64896/getDishByID/3
        [Route("GetDishByTaskID/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(TaskDB.GetDishByTaskID(id));
        }
        //http://localhost:64896/addDish
        [Route("AddTask")]
        public IHttpActionResult Post([FromBody] Task d)
        {
            try
            {
                int res = TaskDB.AddTask(d.TaskDate, d.TaskText, d.TaskDone);
                d.TaskID = res;
                return Ok(d);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }

        }
        //http://localhost:64896/updateDish
        [Route("UpdateTasks")]
        public IHttpActionResult Put([FromBody]Task d)
        {
            try
            {
                int res = TaskDB.UpdateTasks(d.TaskDate, d.TaskText, d.TaskDone, d.TaskID);
                if (res == 1)
                {
                    return Ok(d);
                }
                return Content(HttpStatusCode.NotModified, $"Task with id {d.TaskID} exsits but could not be modified!!!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }
        }
        //http://localhost:64896/DeleteDish
        [Route("DeleteTasks/{id}")]
        public IHttpActionResult Delete(int id)
        {

            try
            {
                int val = TaskDB.DeleteTasks(id);
                if (val > 0) return Ok($"Task with id={id} was deleted!");
                else return Content(HttpStatusCode.NotFound, $"Task with TaskID {id}  was not found to delete!");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}
