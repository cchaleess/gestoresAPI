using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using gestoresAPI.Models;

namespace gestoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartmentController (IConfiguration configuration)
        
        {
            _configuration = configuration;
        }
        
        [HttpGet]

        public JsonResult Get()
        {
            String query = @"
                            select id, name from dbo.Department";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Department dep)
        {

            String query = @"
                            insert into dbo.Department values
                            ('"+dep.name+@"')";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult("Departamento agregado");
        }


        [HttpPut]

        public JsonResult Put(Department dep)
        {

            String query = @"
                            update dbo.Department set 
                            name = '"+dep.name + @"' 
                            where id = "+dep.id + @"
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult("Modificación exitosa");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {

            String query = @" delete from dbo.Department where id =" + id + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult("Borrado exitoso");
        }




    }
}
