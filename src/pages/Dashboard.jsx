import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Panel del Psicólogo</h1>
        <div className="flex gap-4">
          <button className="btn btn-primary">Nueva cita</button>
          <NavLink to={"/index/schedule"} className={"btn btn-info"}>Definir Horario</NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <i className="fa-solid fa-user-group text-3xl"></i>
            </div>
            <div className="stat-title">Pacientes activos</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc">3 nuevos esta semana</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <i className="fa-solid fa-calendar-check text-3xl"></i>
            </div>
            <div className="stat-title">Citas programadas</div>
            <div className="stat-value text-secondary">8</div>
            <div className="stat-desc">2 hoy</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-accent">
              <i className="fa-solid fa-book-open text-3xl"></i>
            </div>
            <div className="stat-title">Entradas de diario</div>
            <div className="stat-value text-accent">24</div>
            <div className="stat-desc">Revisadas esta semana</div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body">
          <h2 className="card-title text-primary">Pacientes recientes</h2>
          <div className="overflow-x-auto mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Última sesión</th>
                  <th>Progreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQDxAQEBAQEhAQEBAPFhAPDQ8NEA8QFhYWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUEBgcDAv/EAD8QAAIBAgIHBAgEBAUFAAAAAAABAgMRBBIFBiExQVFhEyIycTNCUmJygZGhByOxwRRzguEkNGOS0RVDU8Lw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APQAAAAAAAAAAAAAB81Kiim3sS4msY3WeWdxoxTS4viBtRBQ6M1kjKSp149lUe5t/lz8pc9+wua+KhBNykkurA9QUlbWijF22vqldHmtbKPKf+0C/BTQ1noPjJecWZNHTdCW6rHybsBYA+KdaMvDJPyaZ9gAAAAAAAAAAAAAEgAAAAAAAAAAGRYrtLaRjShJXWdp2V9twKXWfSmaXYU3Zes0/sU1KpCnsV5S6bTCnmlLM29ru+ZfaI7JtwcLKUbZ7bU+oFJjK86l4OKUeTV3/YmlRnJKLlKSWzvSb2cixWCs3fbZv6HvGKXADCpYC28yY4aK4GXhod5O11fauhn4jAQXeu1F7bcgKjIuS+iPmVCL3xX0Mislfu7j4Axv4NLwuUH7smjJoYzEUvBWzr2aqv8AdAh7gLbCaywuo4iDov2/HSf9Xq/MvYzTV0009t0000aDVc5bFFW97bcnB0KlOLgqslBu+VPZF9OQG+Ooua+qJjNPc0/JpmivD38Upv8AqZH8IltjOcXzjJqz5gb6Ch1b0nKo50KzTq00pKaVu0g9zfVF8AAAAAgAAAAAAAAAAYWmsW6OHqVF6qAwtPabVFZY7Ztbv+TTKtWU3nnJtsqcXpaU5OXF8TDli5v1mBsUWrl/gNJUsuWcbbLX5nO+2l7T+p9RxM16zA6e8NTnHuT271t2voYeSMpZIzWdbHCXdlfpfeaVhNNTg1xXTYXlHSVPEpKfi5+GSfR70BstOjUhsUfn+x5wxDjmp1U7S+zKmGkK2Htnm50fbe2VP4ua6mVUrue1u/VAfLAAEAkAQSABAJIA9dBr/GprhSaZt5quqlpV60rq8bRtxSNqAAAAAAAAAAAAAABquvukuzo9kt9TY10NqOV68YztMVKPCHdA14gAAAABMZW2reQANi0RppP8utuexSe5rkyxg+wkot3oTdov/wAcnujf2XwNNNj0BilVhKhU27Nl+MeXmgL8GFgKjTlSm7yhuftQe5maAIJIAkEEgDzrStGT5Jn2YmkNqUV6z+wHxozPStXp+kTbceFSD3wf7G9aPxka9KNWD7s1fqmtji+qew1GnGySXBHvoTFdhiVD/tYl7uEK6Wx/1L9gNvAsAAAAAAAAAAAA+asrRb5Js4vpSo516suc2dg0rPLQqvlBnGk/HL/7eB4AkWAgAAAAAPbCV3TnGa3xdz4p7z5YG44yp3aeIj6tr9YPeiwTvt5lLq/U7ShKlLhdfJljo2TdNJ74Xg/lsAygQSAAIAHy4JtM+gAMfSHgzLfCUZrzTTMg8MUr5Ye1JR+4G8UamaMZe1FM+z4oRtGK5JI+wAAAAAAAAAAArtYnbC1vgZx+Hgl5r9zsWn4ZsLWXuM45F92S8gPgngKau0ubSPvEUnCTi+DA82CCy0Tg+2jVgvGoZ4rnbegK49KFFzlljvd9hKw03uhL/ay61UwM/wCLp5oSS27XF2Aodz8iGWem9Gzp4irFQlZTbVou1ntK+dKUfFFrzTQFnqzWy1svCSsbRCnZya9Z3+fM0vRU8tam/eNyqzs4cnK32A9SQAIAJA8MVKyilxlY9lwMbEekprzZlABgaefFU48Ipy/4Bm6q081WtU5WigNnZAAAAALi5IAi4uSAIuLkgDwxkc1Oa5wkvscUqq05J8JNfc7i0cW0zTy4irHlUkBlaH0aq133u61sjZvzNqrYDC1JKVWnVjKyi3leV247DVNXabnX7NTlFSi9sXbcK+ka1Kdo1Zb3vd1vA6BgNA4OSvTjCa2bb3t5rgWWH0XSptShTUWuKSRqGqGnnUxChUgs8lbtILLfpJG+AYtanTgnLJHnsSKTE6UtvcKS5u2b+xsVah2kZQTs2nt5dTTdbtXeyjTmnfMpRk75nt8MgFbTGHb79eTfO39jG0riqFbDVYRqqUklKKkkpRkuTNJats5BAemFlacX7yNzxz7sHynA0uh44+aNyx3o4fFADMARIAi5IAxKj/Pj8LZlGJP08fgZlgRUlZN8kXmqtLLh03vm3L7mu419xri7R+puejaWSlTjyigMi4uSAIuCSAFhYkARYWJAEWFiQBByTXGllxtZc2pfU64cu/EGFsY3zhFgVmg6sqdenUjFyy95xW9x4lvpbQjqt1MP+ZSk3KMovvQvtcJro+JWau1suIpN7m8r6pnUMFhoRV4RUXxtsA1jU7V6dKp2tVWdti4m6GLjsWqMVOSbjmUW0vDfi+hk05JpNbmB9RnZp/rufNHjpDDU61KVFp5Zra9zi+Fn0PU+WgOd6Y1VlTk3fOt+aKd2lzS4mDgtBycKldWyRi3G+1StdSj0asdRcCm1nlGlhK1ko5uWxXe92A5ZQ8cfiRuGN3Ul78TUcGr1IfEjbsTtqUly2gZoAAAkgDFq+mh1izLMTEbKtJ/EvsZQHlOOapShzmnbyN4irJLkkjT9F08+Lh7kXL5m4gLCxIAiwJIAAAAAAAAAk5r+I6/xMHzpo6Sc6/Epfn0n/p/uBqlCq4tSW+MlL6HWtAaQjXpRnF+JK64qXFHIC71Y088JUWa7pSfeXFe8gOrzSs07Wex33WPmk42tFqy5O58UqkK1NSi1OnNXTTumiplhlhsVCSv2Vbub3aFXh8n+tgLwEgCDT/xFxdqUKae2TvbobViMTGmm5SSSOYa4aUWIr3jfLFW2gVmi4XrQ8zat9de7H9TXtXqd6qfI2HCbalSXW30AzQAAAAGLjFtpvlNfcyjxxULxfRqXlY9Hu+QGdqvTvWqz5WibOUWqVP8AKlP25tl6AAAAAAAAAAAAAADnX4lenpfy/wBzopzr8SvT0v5f7gacSgwgLXQenq2El3HeD305PuvquTN1w+t2Gr07VVlexuMldJrammc0AHU62t+Gitk3K3IpdIa9XVqUPmzRgB0LBSVaj/EVJuXdbs90XysaHip5pya4yZnYHSrp4erR9tprpzRWAXmr8bJy6F3o5dy/tO5U4KOWnbmi8oRtBLogPUgkAQCSAJseNadoS6Jo9indR9rOm/WnG3wvagN70DSyYemulywPPDwywiuSSPQAAAAAAAWFgAFhYABYWAk5v+JEv8RBe4dHscw/EGpfF29mCQGssmPEMR4gfJ9SW4+T6lwA+QAAPbCQzTSPEsNEQvJvkBdYeF5RRclRgJ3qW5FuAB8SnY+gJAIAGFXoJYnD1W7RzqEm9yv4X+xmnzVpqScZbmmgN2BS6rY2VSi4Td5UXkze3Hg/OxdWAAWFgAFgAAAAAAAAAOS65Vc2Mq9LI6zN2TfJNnH9Md+dap/q2+zArGI8SGEAJnw8iAwIAAAuNDw7rfNlQXmjY2prrtA9qMsta/NJ/Qz6uOcnlgrt8eRXNZ5JR3rZfoXGEwqguvMCcPRa2yd2ZJ4VMVGO9nl/1CPKT+QGZcgxY6Rp82vNWMinUUvC0/J3A+zxxFRpJRV5S2Liepk6u041K9TMu9TSaXBxfrLqBdaCwPY0knvltb6liAAAAAAAAAAAAAAAY2kqmWjUlyhL9DlmOp2wkZ8alWcvM6PrNJrC1Et8lb6mia2QVOlhqK3xjma6sDWmQSyAAAAlI98TSyqK47z6wFHNPoj60m/zLckkBiFzh53hGMeW1lMbFo6irRst6TAz8HSjShmlxIxFZz7sSdKStGEebJwNO7uB94XBKO17X1MtR6IkAfEqMXvS+hi1dHLxUm6c+j7r80ZwAxsHiM6akss4vLKPJ810Zn6vVMmMlF7qtPMuko7GjDrNRvNrbZRb5q/HyPvDzy4rDS95w+TQG7WAAAAAAAABIAgEgCASAMbG0FUjZ7k830OVa14vtcTO26PdXkjp+nMT2WHqT5RZxqtPNJy5tsD4AAAA9sLTzTSAttG0csL8WV2kF+ZJ9S8hGysVmMpXdV8kmBWG1aH3Q+FGsVY2fmrmzaEeyHwgemlH34Lo2ZeBj3fMwtJelj8LLLDruID1BAAkAgDyxivTmvdZ4Sqd2hPlOm/vYy5q6a5porobcKucf/VgdFi93kSeWDlmpwfOMX9j2AgEgCASQBIAAAAAAAKPXP8AydT5HJQAIAAAytG+kRIAveJjVfFV/lgAUtbdH4UbFq/4YeTAA9tJ+mj8DLHD+GPkAB6BgACQABW4b0FTzq/qABvOhP8ALUf5cf0M0AAAAAAA/9k="
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">María López</div>
                        <div className="text-sm opacity-50">Ansiedad</div>
                      </div>
                    </div>
                  </td>
                  <td>06/11/2025</td>
                  <td>
                    <progress
                      className="progress progress-primary w-24"
                      value="70"
                      max="100"
                    ></progress>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Ver perfil
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQDxAQEBAQEhAQEBAPFhAPDQ8NEA8QFhYWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUEBgcDAv/EAD8QAAIBAgIHBAgEBAUFAAAAAAABAgMRBBIFBiExQVFhEyIycTNCUmJygZGhByOxwRRzguEkNGOS0RVDU8Lw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APQAAAAAAAAAAAAAB81Kiim3sS4msY3WeWdxoxTS4viBtRBQ6M1kjKSp149lUe5t/lz8pc9+wua+KhBNykkurA9QUlbWijF22vqldHmtbKPKf+0C/BTQ1noPjJecWZNHTdCW6rHybsBYA+KdaMvDJPyaZ9gAAAAAAAAAAAAAEgAAAAAAAAAAGRYrtLaRjShJXWdp2V9twKXWfSmaXYU3Zes0/sU1KpCnsV5S6bTCnmlLM29ru+ZfaI7JtwcLKUbZ7bU+oFJjK86l4OKUeTV3/YmlRnJKLlKSWzvSb2cixWCs3fbZv6HvGKXADCpYC28yY4aK4GXhod5O11fauhn4jAQXeu1F7bcgKjIuS+iPmVCL3xX0Mislfu7j4Axv4NLwuUH7smjJoYzEUvBWzr2aqv8AdAh7gLbCaywuo4iDov2/HSf9Xq/MvYzTV0009t0000aDVc5bFFW97bcnB0KlOLgqslBu+VPZF9OQG+Ooua+qJjNPc0/JpmivD38Upv8AqZH8IltjOcXzjJqz5gb6Ch1b0nKo50KzTq00pKaVu0g9zfVF8AAAAAgAAAAAAAAAAYWmsW6OHqVF6qAwtPabVFZY7Ztbv+TTKtWU3nnJtsqcXpaU5OXF8TDli5v1mBsUWrl/gNJUsuWcbbLX5nO+2l7T+p9RxM16zA6e8NTnHuT271t2voYeSMpZIzWdbHCXdlfpfeaVhNNTg1xXTYXlHSVPEpKfi5+GSfR70BstOjUhsUfn+x5wxDjmp1U7S+zKmGkK2Htnm50fbe2VP4ua6mVUrue1u/VAfLAAEAkAQSABAJIA9dBr/GprhSaZt5quqlpV60rq8bRtxSNqAAAAAAAAAAAAAABquvukuzo9kt9TY10NqOV68YztMVKPCHdA14gAAAABMZW2reQANi0RppP8utuexSe5rkyxg+wkot3oTdov/wAcnujf2XwNNNj0BilVhKhU27Nl+MeXmgL8GFgKjTlSm7yhuftQe5maAIJIAkEEgDzrStGT5Jn2YmkNqUV6z+wHxozPStXp+kTbceFSD3wf7G9aPxka9KNWD7s1fqmtji+qew1GnGySXBHvoTFdhiVD/tYl7uEK6Wx/1L9gNvAsAAAAAAAAAAAA+asrRb5Js4vpSo516suc2dg0rPLQqvlBnGk/HL/7eB4AkWAgAAAAAPbCV3TnGa3xdz4p7z5YG44yp3aeIj6tr9YPeiwTvt5lLq/U7ShKlLhdfJljo2TdNJ74Xg/lsAygQSAAIAHy4JtM+gAMfSHgzLfCUZrzTTMg8MUr5Ye1JR+4G8UamaMZe1FM+z4oRtGK5JI+wAAAAAAAAAAArtYnbC1vgZx+Hgl5r9zsWn4ZsLWXuM45F92S8gPgngKau0ubSPvEUnCTi+DA82CCy0Tg+2jVgvGoZ4rnbegK49KFFzlljvd9hKw03uhL/ay61UwM/wCLp5oSS27XF2Aodz8iGWem9Gzp4irFQlZTbVou1ntK+dKUfFFrzTQFnqzWy1svCSsbRCnZya9Z3+fM0vRU8tam/eNyqzs4cnK32A9SQAIAJA8MVKyilxlY9lwMbEekprzZlABgaefFU48Ipy/4Bm6q081WtU5WigNnZAAAAALi5IAi4uSAIuLkgDwxkc1Oa5wkvscUqq05J8JNfc7i0cW0zTy4irHlUkBlaH0aq133u61sjZvzNqrYDC1JKVWnVjKyi3leV247DVNXabnX7NTlFSi9sXbcK+ka1Kdo1Zb3vd1vA6BgNA4OSvTjCa2bb3t5rgWWH0XSptShTUWuKSRqGqGnnUxChUgs8lbtILLfpJG+AYtanTgnLJHnsSKTE6UtvcKS5u2b+xsVah2kZQTs2nt5dTTdbtXeyjTmnfMpRk75nt8MgFbTGHb79eTfO39jG0riqFbDVYRqqUklKKkkpRkuTNJats5BAemFlacX7yNzxz7sHynA0uh44+aNyx3o4fFADMARIAi5IAxKj/Pj8LZlGJP08fgZlgRUlZN8kXmqtLLh03vm3L7mu419xri7R+puejaWSlTjyigMi4uSAIuCSAFhYkARYWJAEWFiQBByTXGllxtZc2pfU64cu/EGFsY3zhFgVmg6sqdenUjFyy95xW9x4lvpbQjqt1MP+ZSk3KMovvQvtcJro+JWau1suIpN7m8r6pnUMFhoRV4RUXxtsA1jU7V6dKp2tVWdti4m6GLjsWqMVOSbjmUW0vDfi+hk05JpNbmB9RnZp/rufNHjpDDU61KVFp5Zra9zi+Fn0PU+WgOd6Y1VlTk3fOt+aKd2lzS4mDgtBycKldWyRi3G+1StdSj0asdRcCm1nlGlhK1ko5uWxXe92A5ZQ8cfiRuGN3Ul78TUcGr1IfEjbsTtqUly2gZoAAAkgDFq+mh1izLMTEbKtJ/EvsZQHlOOapShzmnbyN4irJLkkjT9F08+Lh7kXL5m4gLCxIAiwJIAAAAAAAAAk5r+I6/xMHzpo6Sc6/Epfn0n/p/uBqlCq4tSW+MlL6HWtAaQjXpRnF+JK64qXFHIC71Y088JUWa7pSfeXFe8gOrzSs07Wex33WPmk42tFqy5O58UqkK1NSi1OnNXTTumiplhlhsVCSv2Vbub3aFXh8n+tgLwEgCDT/xFxdqUKae2TvbobViMTGmm5SSSOYa4aUWIr3jfLFW2gVmi4XrQ8zat9de7H9TXtXqd6qfI2HCbalSXW30AzQAAAAGLjFtpvlNfcyjxxULxfRqXlY9Hu+QGdqvTvWqz5WibOUWqVP8AKlP25tl6AAAAAAAAAAAAAADnX4lenpfy/wBzopzr8SvT0v5f7gacSgwgLXQenq2El3HeD305PuvquTN1w+t2Gr07VVlexuMldJrammc0AHU62t+Gitk3K3IpdIa9XVqUPmzRgB0LBSVaj/EVJuXdbs90XysaHip5pya4yZnYHSrp4erR9tprpzRWAXmr8bJy6F3o5dy/tO5U4KOWnbmi8oRtBLogPUgkAQCSAJseNadoS6Jo9indR9rOm/WnG3wvagN70DSyYemulywPPDwywiuSSPQAAAAAAAWFgAFhYABYWAk5v+JEv8RBe4dHscw/EGpfF29mCQGssmPEMR4gfJ9SW4+T6lwA+QAAPbCQzTSPEsNEQvJvkBdYeF5RRclRgJ3qW5FuAB8SnY+gJAIAGFXoJYnD1W7RzqEm9yv4X+xmnzVpqScZbmmgN2BS6rY2VSi4Td5UXkze3Hg/OxdWAAWFgAFgAAAAAAAAAOS65Vc2Mq9LI6zN2TfJNnH9Md+dap/q2+zArGI8SGEAJnw8iAwIAAAuNDw7rfNlQXmjY2prrtA9qMsta/NJ/Qz6uOcnlgrt8eRXNZ5JR3rZfoXGEwqguvMCcPRa2yd2ZJ4VMVGO9nl/1CPKT+QGZcgxY6Rp82vNWMinUUvC0/J3A+zxxFRpJRV5S2Liepk6u041K9TMu9TSaXBxfrLqBdaCwPY0knvltb6liAAAAAAAAAAAAAAAY2kqmWjUlyhL9DlmOp2wkZ8alWcvM6PrNJrC1Et8lb6mia2QVOlhqK3xjma6sDWmQSyAAAAlI98TSyqK47z6wFHNPoj60m/zLckkBiFzh53hGMeW1lMbFo6irRst6TAz8HSjShmlxIxFZz7sSdKStGEebJwNO7uB94XBKO17X1MtR6IkAfEqMXvS+hi1dHLxUm6c+j7r80ZwAxsHiM6akss4vLKPJ810Zn6vVMmMlF7qtPMuko7GjDrNRvNrbZRb5q/HyPvDzy4rDS95w+TQG7WAAAAAAAABIAgEgCASAMbG0FUjZ7k830OVa14vtcTO26PdXkjp+nMT2WHqT5RZxqtPNJy5tsD4AAAA9sLTzTSAttG0csL8WV2kF+ZJ9S8hGysVmMpXdV8kmBWG1aH3Q+FGsVY2fmrmzaEeyHwgemlH34Lo2ZeBj3fMwtJelj8LLLDruID1BAAkAgDyxivTmvdZ4Sqd2hPlOm/vYy5q6a5porobcKucf/VgdFi93kSeWDlmpwfOMX9j2AgEgCASQBIAAAAAAAKPXP8AydT5HJQAIAAAytG+kRIAveJjVfFV/lgAUtbdH4UbFq/4YeTAA9tJ+mj8DLHD+GPkAB6BgACQABW4b0FTzq/qABvOhP8ALUf5cf0M0AAAAAAA/9k="
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Carlos Jiménez</div>
                        <div className="text-sm opacity-50">Estrés laboral</div>
                      </div>
                    </div>
                  </td>
                  <td>05/11/2025</td>
                  <td>
                    <progress
                      className="progress progress-secondary w-24"
                      value="50"
                      max="100"
                    ></progress>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Ver perfil
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-primary">Próximas citas</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span>
                <strong>09:00 AM</strong> — Juan Pérez
              </span>
              <span className="badge badge-primary">Presencial</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>
                <strong>11:30 AM</strong> — Laura Gómez
              </span>
              <span className="badge badge-secondary">Virtual</span>
            </li>
            <li className="flex justify-between items-center">
              <span>
                <strong>4:00 PM</strong> — Roberto Díaz
              </span>
              <span className="badge badge-accent">Presencial</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
