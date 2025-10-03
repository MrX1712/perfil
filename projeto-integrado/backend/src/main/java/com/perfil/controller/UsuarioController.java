package com.perfil.controller;

import com.perfil.model.*;
import com.perfil.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Exibe a página principal com o formulário integrado
     */


    /**
     * Endpoint REST para processar o questionário via AJAX (JavaScript)
     * Retorna JSON com o resultado do perfil
     */
    @PostMapping("/api/processar")
    @ResponseBody
    public ResponseEntity<?> processarQuestionarioAjax(@RequestBody QuestionarioForm questionarioForm) {
        try {
            Usuario usuario = usuarioService.processarQuestionario(questionarioForm);

            // Criar resposta JSON com dados do resultado
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("nome", usuario.getNome());
            response.put("email", usuario.getEmail());
            response.put("perfil", usuario.getPerfil().getNome());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erro ao processar questionário: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Endpoint para obter detalhes de um perfil específico
     */
    @GetMapping("/api/perfil/{nomePerfil}")
    @ResponseBody
    public ResponseEntity<?> obterDetalhesPerfil(@PathVariable String nomePerfil) {
        try {
            var detalhes = usuarioService.obterDetalhesPerfilPorNome(nomePerfil);
            return ResponseEntity.ok(detalhes);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Perfil não encontrado: " + nomePerfil);
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint de teste para verificar conectividade
     */
    @GetMapping("/api/test")
    @ResponseBody
    public ResponseEntity<?> testeConectividade() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Backend conectado com sucesso!");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
